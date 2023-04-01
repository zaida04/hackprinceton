import { GetStream } from "../lib/api-frontend";
import { Stream } from "@cloudflare/stream-react";

export default function VideoStream(props) {
  return (
    <Stream
      controls
      height="1080"
      width="1920"
      autoplay
      src={props.stream.videoId}
    />
  );
}
