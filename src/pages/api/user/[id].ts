import { NextApiRequest, NextApiResponse } from "next";
export default async function fetchUserLSTimesById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  const lsData = await fetch(
    "https://developer.sepush.co.za/business/2.0/api_allowance",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: "O2PNesb3ZomMCa502gn3",
      },
    }
  );
  const lsDataJson = await lsData.json();
  res.json(lsDataJson);
}
