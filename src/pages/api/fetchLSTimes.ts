import { NextApiRequest, NextApiResponse } from "next";
export default function fetchLSTimes(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  res.json({ time: Date.now(), method: req.method });
}
