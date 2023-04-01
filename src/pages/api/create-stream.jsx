import { createCloudflareStreamHTTP } from "../../lib/api-backend";

export default async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "HTTP method not allowed." });

  // stream name
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ error: "Must provide stream name." });

  // create stream from cloudflare
  const createdStream = await createCloudflareStreamHTTP(name);

  return res.status(200).json({
    id: createdStream.uid,
    createdAt: new Date(),
    // connection info for creator to use to broadcast to cloudflare
    connectionInfo: createdStream.rtmps,
    name,
  });
};
