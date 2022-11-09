import { NextApiRequest, NextApiResponse } from "next";
export default async function fetchUserLSTimesById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  console.log(`ENDPOINT: /api/sepush/${req.query.id}/${req.query.date} WAS HIT`);

  const pushID = req.query.id;
  const pushDate = req.query.date;
  const lsData = await fetch(
    // &test=current
    `https://developer.sepush.co.za/business/2.0/area?id=${pushID}&test=current`,
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
    const currentStage = +events[0].note.split(" ")[1];
    const { days } = schedule;
    res.json({ lsdata: [...days], currentStage });
    return;
  }
  res.json({ error: "schedule not found" });
}
