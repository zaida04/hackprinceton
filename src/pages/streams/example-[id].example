import { useRouter } from "next/router";
import VideoStream from "../../components/VideoStream";
import { useEffect, useState } from "react";
import { getStreamHTTP } from "../../lib/api-frontend";

// The page that viewers, not creator, will see.
export default function Stream() {
  // Get stream ID from URL
  const router = useRouter();

  // Fetch stream data from cloudflare
  const [streamData, setStreamData] = useState(null);

  // On page load/stream ID retrievable from router
  useEffect(() => {
    if (!router.query.id) return;

    // fetch stream data (can't use async await easily in useEffect)
    getStreamHTTP(router.query.id).then((data) => {
      setStreamData(data);
    });
  }, [router]);

  // this use effect runs when the stream data has been fetched
  useEffect(() => {
    // if the stream has started, do nothing
    if (streamData?.videoId !== null) return;

    // if the stream has not started, refresh data after 15 seconds.
    setTimeout(() => {
      getStreamHTTP(router.query.id).then((data) => {
        setStreamData(data);
      });
    }, 15_000);
  }, [streamData]);

  // still loading stream fetch request
  if (streamData == null)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="font-bold text-3xl">Loading...</h1>
      </div>
    );

  // playbackUrl will only be null when the stream has not started and has no playback urls.
  // when you create a stream in cloudflare, it doesn't automatically have playback urls.
  // it only has those when the actual broadcaster begins streaming to cloudflare.
  if (streamData.videoId == null)
    return (
      <h1 className="font-bold text-red-700 text-xl">
        Stream has not yet started, check back later...
      </h1>
    );

  return (
    streamData && (
      <div>
        <h1>{streamData.name}</h1>
        <VideoStream stream={streamData} />
      </div>
    )
  );
}
