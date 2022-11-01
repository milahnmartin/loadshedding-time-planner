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
  const lsData = await fetch(
    `https://developer.sepush.co.za/business/2.0/status&test=current`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: process.env.NEXT_PUBLIC_ESKOM_SEPUSH_TOKEN as string,
      },
    }
  );
  const lsDataJson = await lsData.json();
  res.json(lsDataJson);
}
