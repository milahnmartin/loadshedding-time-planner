import { NextApiRequest, NextApiResponse } from "next";
export default async function fetchUserLSAreaID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  //http://espclone.webredirect.org:8000/areas_search?text=
  //  https://developer.sepush.co.za/business/2.0/areas_search?text=
  const pushID = req.query.id;
  const lsData = await fetch(
    `https://developer.sepush.co.za/business/2.0/areas_search?text=${pushID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: process.env.NEXT_PUBLIC_ESKOM_SEPUSH_TOKEN as string,
      },
    }
  );
  const lsDataJson = await lsData.json();
  res.json(lsDataJson.areas);
}
