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
  const [name, setName] = useState<string>("");

  // created stream data, populated when the button is clicked
  const [streamCreatorData, setStreamCreatorData] =
    useState<CreateStream>(null);

  // stream data for playback, not the created stream data.
  // this is the data that a viewer will rz
  const [streamData, setStreamData] = useState<GetStream>(null);

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
