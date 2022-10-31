import { NextApiRequest, NextApiResponse } from "next";
export default async function fetchUserLSAreaID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  const pushID = req.query.id;
  console.log(pushID);
  const lsData = await fetch(
    `https://developer.sepush.co.za/business/2.0/areas_search?text=${pushID}&test=current`,
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
