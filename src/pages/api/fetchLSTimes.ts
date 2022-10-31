import { NextApiRequest, NextApiResponse } from "next";
export default async function fetchLSTimes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  const data = await fetch(
    "https://developer.sepush.co.za/business/2.0/status&test=current",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: process.env.NEXT_PUBLIC_ESKOM_SEPUSH_TOKEN as string,
      },
    }
  );
  const jsonDATA = await data.json();
  res.json(jsonDATA);
}
