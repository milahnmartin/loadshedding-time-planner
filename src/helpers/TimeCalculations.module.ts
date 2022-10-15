class TimeCalculations {
  static sortLoadSheddingTime = (times: string[]): string[] => {
    const unsortedTimes = Array.from(new Set(times));
    return unsortedTimes.sort();
  };
  static getInitialStartTime = (
    LoadSheddingTimes: string[],
    UserStartTime: string,
    MaxGameTime: number
  ): string | undefined => {
    const EarliestLSTime: string | undefined =
      this.sortLoadSheddingTime(LoadSheddingTimes)[0];
    if (!EarliestLSTime) return;
    const EarliestLSTimeSplit = EarliestLSTime.split("-")[0];
    const EarliestLSTimeDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(EarliestLSTimeSplit?.split(":")[0]),
      Number(EarliestLSTimeSplit?.split(":")[1])
    );
    const UserStartTimeDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(UserStartTime?.split(":")[0]),
      Number(UserStartTime?.split(":")[1])
    );
    let TimeDifference =
      (EarliestLSTimeDate.getTime() - UserStartTimeDate.getTime()) / 1000;
    let CalcTimeDifference = (TimeDifference /= 60);
    return MaxGameTime <= CalcTimeDifference
      ? ` Start Time: ${UserStartTime} - ${CalcTimeDifference} min`
      : undefined;
  };

  static getInitialEndTimes = (
    LoadSheddingTimes: string[],
    UserEndTime: string,
    MaxGameTime: number
  ) => {
    const SortedLSTimes: string[] = this.sortLoadSheddingTime(LoadSheddingTimes);
    const LatestLSTime: string | undefined = SortedLSTimes[SortedLSTimes.length - 1];
    if (!LatestLSTime) return;
    const LatestLSTimeSplit = LatestLSTime.split("-")[1];
    const LastLoadsheddingTime = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(LatestLSTimeSplit?.split(":")[0]),
      Number(LatestLSTimeSplit?.split(":")[1])
    );
    const LastGameTime = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(UserEndTime?.split(":")[0]),
      Number(UserEndTime?.split(":")[1])
    );
    let TimeDifference =
      (LastLoadsheddingTime.getTime() - LastGameTime.getTime()) / 1000;
    let CalcTimeDifference = (TimeDifference /= 60);
    return MaxGameTime <= CalcTimeDifference
      ? ` Start Time: ${LatestLSTimeSplit} - ${CalcTimeDifference} min`
      : undefined;
  };

  static getInbetweenTimes = (
    LoadSheddingTimes: string[],
    MaxGameTime: number
  ): string[] => {
    const LSTimes: string[] = [];
    const SortedLSTimes: string[] = this.sortLoadSheddingTime(LoadSheddingTimes);
    if (SortedLSTimes.length < 2) return [];
    for (let i = 0; i < SortedLSTimes.length; i++) {
      const startTime = SortedLSTimes[i]?.split("-")[1];
      const endTime = SortedLSTimes[i + 1]?.split("-")[0];
      if (!endTime) break;
      const start = new Date(
        2022,
        new Date().getMonth(),
        1,
        Number(startTime?.split(":")[0]),
        Number(startTime?.split(":")[1])
      );
      const end = new Date(
        2022,
        new Date().getMonth(),
        1,
        Number(endTime?.split(":")[0]),
        Number(endTime?.split(":")[1])
      );
      let diff = (end.getTime() - start.getTime()) / 1000;
      let pStart = (diff /= 60);
      if (MaxGameTime > pStart) continue;
      LSTimes.push(`Start Time: ${startTime} - ${pStart} min`);
    }
    return LSTimes;
  };
}

export default TimeCalculations;
