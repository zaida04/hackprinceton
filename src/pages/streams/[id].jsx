import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import {
  getCloudflareStreamVideoHTTP,
  getCloudflareStreamHTTP,
} from "../../lib/api-backend";

export default function StreamId() {
  const router = useRouter();
  const id = router.query.id;
  const isHost = router.query.isHost;

  // Fetch stream data from cloudflare
  const [streamData, setStreamData] = useState(null);
  const [videoData, setVideoData] = useState(null);

  // On page load/stream ID retrievable from router
  useEffect(() => {
    if (!router.query.id) return;
    getCloudflareStreamHTTP(router.query.id).then((data) => {
      setStreamData(data);
    });

    // // fetch stream data (can't use async await easily in useEffect)
    // getCloudflareStreamVideoHTTP(router.query.id)
    //   .then((data) => {
    //     setVideoData(data);
    //   })
    //   .catch(() => setStreamData({}));
  }, [router]);

  console.log(streamData);

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
                  className="py-2 px-4 hover:cursor-pointer hover:text-gray-400 bg-white border-[2px] border-black w-fit m-2 rounded-lg text-black"
                >
                  {url}
                </code>
                <code
                  onClick={() => {
                    navigator.clipboard.writeText(token);
                  }}
                  className="py-2 px-4 hover:cursor-pointer hover:text-gray-400 bg-white border-[2px] border-black w-fit m-2 rounded-lg text-black"
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
        <div className="h-[25rem] md:w-2/3 bg-red-300 flex justify-center items-start">
          <p>Place livestream here</p>
        </div>

        <div className="h-[25rem] md:w-1/3 bg-yellow-200 flex align-middle justify-center">
          <p>Place chat here</p>
        </div>
      </div>
    </Layout>
  );
}
