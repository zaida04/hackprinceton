import { getCloudflareStreamHTTP } from "../../../lib/api-backend";
import firebase from "../../../service/firebase";

export default async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).json({ error: "HTTP method not allowed." });

  // stream ID
  const stream_uid = req.query.id;

  // get stream from Cloudflare
  const fetchStream = await getCloudflareStreamHTTP(stream_uid);
  if(!fetchStream.uid) return res.status(400).json({ error: "Stream doesn't exist."});

  const streamData = await firebase.firestore().collection('streams').doc(fetchStream.uid).get();
  if(!streamData.exists) return res.status(500).json({ error: "Stream not in firebase"})

  // get current running livestream playback url.
  // this won't exist if the stream creator hasn't began broadcasting to cloudflare
  const getCurrentLiveStream = fetchStream.find(
    (x) => x.status.state === "live-inprogress"
  );

  return res.status(200).json({
    videoId: getCurrentLiveStream?.uid,
    ...streamData.data()
  });
};
