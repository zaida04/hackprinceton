import { useState } from "react";
import VideoStream from "../components/VideoStream";
import {
  CreateStream,
  GetStream,
  createStreamHTTP,
  getStreamHTTP,
} from "../lib/api-frontend";
import Layout from "../components/Layout";

// Page that creators will see
export default function Home() {
  // stream name
  const [name, setName] = useState("");

  // created stream data, populated when the button is clicked
  const [streamCreatorData, setStreamCreatorData] =
    useState(null);

  // stream data for playback, not the created stream data.
  // this is the data that a viewer will rz
  const [streamData, setStreamData] = useState(null);

  // callback for stream create button
  const onCreateStreamClick = async () => {
    if (name == "") return;
    // create the stream
    const newStream = await createStreamHTTP(name);
    setStreamCreatorData(newStream);

    // using the created stream data, get the playback URL
    const retrieveStreamData = await getStreamHTTP(newStream.id);
    setStreamData(retrieveStreamData);
  };

  return (
    <Layout>
      <main>
        <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div className="lg:py-24">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block">A better way to</span>
                    <span className="block text-indigo-400">learn</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Not getting enough support from your TAs? Go from 0-100 with cram classes taughts by the high performing students right in your class.
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <div className="sm:mx-auto sm:max-w-xl lg:mx-0">
                      <div className="sm:flex">
                        <div className="mt-3">
                          <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                          >
                            Create a stream
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
                <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0">
                  {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                  <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
        <div>
          {streamData !== null && (
            <div>
              <VideoStream stream={streamData} />
              <p>Stream ID: {streamCreatorData.id}</p>
              <p>Stream Name: {streamCreatorData.name}</p>
              <p>
                Stream Created At:{" "}
                {streamCreatorData.createdAt.toLocaleString()}
              </p>
              <p>
                Stream Connection URL: {streamCreatorData.connectionInfo.url}
              </p>
              <p>
                Stream connection token:{" "}
                {streamCreatorData.connectionInfo.streamKey}
              </p>
            </div>
          )}
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="stream name here!"
            className="p-4 border-[1px] border-gray-400 mr-2"
          ></input>
          <button
            onClick={onCreateStreamClick}
            className="bg-gray-800 rounded-lg border-[1px] border-gray-400 p-4 text-white font-bold"
          >
            Create Stream
          </button>
        </div>
      </div> */}
    </Layout>
  );
}
