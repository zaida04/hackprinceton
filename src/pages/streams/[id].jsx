import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState, useEffect, useRef } from "react";
import {
  getCloudflareStreamVideoHTTP,
  getCloudflareStreamHTTP,
} from "../../lib/api-backend";
import VideoStream from "../../components/VideoStream";
import Chat from "../../components/Chat";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
// import { firestore } from "../service/firebase";
import { firestore, storage } from "../../service/firebase";

export default function StreamId() {
  const router = useRouter();
  const id = router.query.id;
  const isHost = router.query.isHost;

  // Fetch stream data from cloudflare
  const [streamData, setStreamData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [streamInfo, setStreamInfo] = useState(null);
  const [allEduPurple, setEduPurples] = useState([]);
  const inputFile = useRef(null);
  const downloadRef = useRef(null);

  const getStreamInfo = async () => {
    const infoRef = doc(firestore, "streams", router.query.id);
    const querySnapshot = await getDoc(infoRef);
    return querySnapshot.data();
  };

  const getAllEduPurples = async () => {
    const infoRef = collection(firestore, "edup");
    const querySnapshot = await getDocs(infoRef);
    return querySnapshot.docs.map((doc) => doc.data());
  };

  console.log(allEduPurple);

  // On page load/stream ID retrievable from router
  useEffect(() => {
    if (!router.query.id) return;
    getCloudflareStreamHTTP(router.query.id).then((data) => {
      setStreamData(data);
    });

    getStreamInfo().then((data) => {
      setStreamInfo(data);
    });

    getAllEduPurples().then((data) => {
      setEduPurples(data);
    });

    // // fetch stream data (can't use async await easily in useEffect)
    getCloudflareStreamVideoHTTP(router.query.id).then((data) => {
      setVideoData(
        data?.find((x) => x.status.state === "live-inprogress") ?? null
      );
    });
  }, [router.query.id]);

  useEffect(() => {
    if (!streamInfo) return;
    const infoRef = doc(firestore, "streams", id);
    const unsubscribe = onSnapshot(infoRef, (QuerySnapshot) => {
      setStreamInfo({ ...streamInfo, files: QuerySnapshot.data().files });
    });
    return () => unsubscribe;
  }, [streamInfo]);

  const uploadFile = () => {
    if (!inputFile.current) return;
    const file = inputFile.current.files[0];

    // Create a reference to 'images/mountains.jpg'
    const fileRef = storageRef(storage, "images/" + file.name);
    uploadBytes(fileRef, file).then((snapshot) => {
      const infoRef = doc(firestore, "streams", id);

      updateDoc(infoRef, {
        files: [
          ...streamInfo.files,
          { name: file.name, path: snapshot.ref.fullPath },
        ],
      }).then(() => {
        setStreamInfo({
          ...streamInfo,
          files: [
            ...streamInfo.files,
            { name: file.name, path: snapshot.ref.fullPath },
          ],
        });
      });
    });
  };

  // still loading stream fetch request
  if (streamData == null)
    return (
      <Layout>
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="font-bold text-3xl">Loading...</h1>
        </div>
      </Layout>
    );

  if (!streamData.success) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center">
          <p className="text-6xl font-bold">404</p>
          <p className="text-xl">
            Wanna go{" "}
            <a href="/" className="text-red-600">
              home?
            </a>{" "}
            Me too.
          </p>
        </div>
      </Layout>
    );
  }

  const url = streamData.result.rtmps.url;
  const token = streamData.result.rtmps.streamKey;
  console.log(streamInfo);

  return (
    <Layout>
      <div>
        {isHost && (
          <div className="m-8 flex justify-center flex-col">
            <h2 className="text-4xl font-semibold pb-2">How to stream</h2>
            <ol className="text-xl">
              <li className="flex flex-col">
                1. Copy your stream URL and stream key from here:
                <code
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                  }}
                  className="text-sm py-2 px-4 hover:cursor-pointer hover:text-gray-400 bg-white border-[2px] border-black w-fit m-2 rounded-lg text-black"
                >
                  {url}
                </code>
                <code
                  onClick={() => {
                    navigator.clipboard.writeText(token);
                  }}
                  className="text-sm py-2 px-4 hover:cursor-pointer hover:text-gray-400 bg-white border-[2px] border-black w-fit m-2 rounded-lg text-black"
                >
                  {token}
                </code>
              </li>
              <li>
                2. Set up{" "}
                <a
                  className="font-semibold text-indigo-500"
                  href="https://obsproject.com/wiki/OBS-Studio-Quickstart"
                >
                  OBS for streaming
                </a>
              </li>
              <li>3. Start the stream in OBS</li>
            </ol>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row p-4 space-x-8">
        {videoData ? (
          <div className="h-[25rem] md:w-2/3">
            <VideoStream videoId={videoData.uid} />
          </div>
        ) : (
          <div className="h-[25rem] md:w-2/3 bg-black flex justify-center items-start"></div>
        )}

        <div className="h-[25rem] border-[1px] border-gray-300 md:w-1/3 align-middle justify-center">
          <Chat data={router.query.id} allEduPurple={allEduPurple} />
        </div>
      </div>
      <div className="w-1/2 mb-8 mx-8">
        <h2 className="text-3xl font-semibold mb-4">About this stream</h2>
        <p className="text-xl">
          {streamInfo?.about ?? "Loading description..."}
        </p>
      </div>

      <div className="my-3 mx-8">
        {/** File upload */}
        <div className="w-full flex flex-col md:flex-row space-x-4">
          {isHost && (
            <>
              <input
                type="file"
                id="file"
                ref={inputFile}
                onChange={uploadFile}
                style={{ display: "none" }}
              />
              <a ref={downloadRef} download target="_blank" />
              <div
                className="md:w-1/3 border-2 border-dashed border-black rounded-lg bg-orange-100 shadow-sm hover:shadow-lg transition-shadow mb-8 hover:cursor-pointer"
                onClick={() => inputFile.current.click()}
              >
                <div className="my-12 flex flex-col items-center">
                  <h5 className="mb-1 text-xl font-medium text-gray-900">
                    New File
                  </h5>
                  <span className="text-sm text-gray-600 ">
                    Click here to upload a file
                  </span>
                </div>
              </div>
            </>
          )}

          {streamInfo?.files?.map((file) => (
            <div
              className="md:w-1/3 border-2 border-dashed border-black rounded-lg shadow-sm hover:shadow-lg transition-shadow mb-8 hover:cursor-pointer"
              onClick={() => {
                getDownloadURL(storageRef(storage, "images/" + file.name)).then(
                  (url) => {
                    downloadRef.current.href = url;
                    downloadRef.current.click();
                  }
                );
              }}
            >
              <div className="my-12 flex flex-col items-center">
                <h5 className="mb-1 text-xl font-medium text-gray-900">
                  {file.name}
                </h5>
                <span className="text-sm text-gray-600 ">
                  Click here to download
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
