export default async function getGameData(req: any, res: any): Promise<void> {
  res.status(200).json({
    group: 4,
    location: "Waterkloof Glen",
    time: ["14:00-16:00", "18:00-20:00"],
  });
}
