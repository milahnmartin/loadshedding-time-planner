export default async function getUserLsTime(req: any, res: any): Promise<void> {
  fetch("https://developer.sepush.co.za/business/2.0/api_allowance", {
    method: "GET",
    headers: {
      Token: process.env.NEXT_PUBLIC_ESKOM_SEPUSH_API_KEY as string,
      ContentType: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((data) => {
      res.status(200).json({ ...data, status: "success" });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
}
