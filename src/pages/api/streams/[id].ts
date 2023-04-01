import { NextApiRequest, NextApiResponse } from "next";
import { getCloudflareStreamHTTP } from "../../../lib/api-backend";
import { GetStream } from "../../../lib/api-frontend";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ error: "HTTP method not allowed." });

  // stream ID
  const stream_uid = req.query.id as string;

  // get stream from Cloudflare
  const fetchStream = await getCloudflareStreamHTTP(stream_uid);

  // get current running livestream playback url.
  // this won't exist if the stream creator hasn't began broadcasting to cloudflare
  const getCurrentLiveStream = fetchStream.find(
    (x) => x.status.state === "live-inprogress"
  );

  return res.status(200).json({
    videoId: getCurrentLiveStream?.uid,
    name: getCurrentLiveStream?.meta.name ?? null,
  } as GetStream);
};
