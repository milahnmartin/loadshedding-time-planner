import { NextApiRequest, NextApiResponse } from "next";
export default async function fetchCurrentStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  if (req.headers.host !== "localhost:3000") {
    res.status(403).json({ message: "Forbidden" });
  }
  const lsData = await fetch(`http://espclone.webredirect.org:8000/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const lsDataJson = await lsData.json().then((resp) => resp.status);
  res.json(lsDataJson);
}
