import { NextApiRequest, NextApiResponse } from "next";
export default async function fetchUserLSTimesById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  const pushID = req.query.id;
  const pushDate = req.query.date;
  const lsData = await fetch(
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
    let currentStage = events[0]?.note;

    currentStage = Number(currentStage.split(" ")[1]);
    const specificDateTimes = schedule?.days.find(
      (day: any) => day.date === pushDate
    );
    res.json(specificDateTimes?.stages[currentStage - 1]);
  } else {
    res.json({ message: "area not found" });
  }
}
