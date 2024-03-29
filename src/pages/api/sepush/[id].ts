import { NextApiRequest, NextApiResponse } from "next";
export default async function fetchUserLSTimesById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  console.log(`ENDPOINT: /api/sepush/${req.query.id} WAS HIT`);

  const pushID = req.query.id;
  const lsData = await fetch(
    // &test=current
    `https://developer.sepush.co.za/business/2.0/area?id=${pushID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: process.env.NEXT_PUBLIC_ESKOM_SEPUSH_TOKEN as string,
      },
    }
  );
  const lsDataJson = await lsData.json();
  if (!lsDataJson.error) {
    const { events, info, schedule } = lsDataJson;
    const { days } = schedule;

    res.json({ lsdata: days });
    return;
  }
  res.json({ error: "schedule not found" });
}
