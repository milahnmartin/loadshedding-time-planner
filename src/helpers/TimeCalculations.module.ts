type ResponseData = string | undefined[];
class TimeCalculations {
  static sortLoadSheddingTime = (times: string[]): string[] => {
    const unsortedTimes = Array.from(new Set(times));
    return unsortedTimes.sort() as string[];
  };

  static calcBufferTimes = (times: string[]) => {
    const sortedTimes = this.sortLoadSheddingTime(times);
  };

  static getInitialStartTime = (
    LoadSheddingTimes: string[],
    UserStartTime: string,
    MaxGameTime: number
  ): string | undefined => {
    const EarliestLSTime: any = this.sortLoadSheddingTime(LoadSheddingTimes)[0];
    if (!EarliestLSTime) return;
    const EarliestLSTimeSplit = EarliestLSTime.split("-")[0];
    const EarliestLSTimeDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      +EarliestLSTimeSplit?.split(":")[0],
      +EarliestLSTimeSplit?.split(":")[1]
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

    if (MaxGameTime <= CalcTimeDifference) {
      return `Start Time: ${UserStartTime} - ${CalcTimeDifference} MIN`;
    }
  };

  static getInitialEndTimes = (
    LoadSheddingTimes: string[],
    UserEndTime: string,
    MaxGameTime: number,
    endDate: string
  ) => {
    const SortedLSTimes: string[] = this.sortLoadSheddingTime(LoadSheddingTimes);
    const LatestLSTime: string = SortedLSTimes[SortedLSTimes.length - 1]!;
    if (!LatestLSTime) return;
    const newEndDate = new Date(endDate);
    console.log(endDate);
    const LatestLSTimeSplit = LatestLSTime.split("-")[1];
    const LastLoadsheddingTime = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(LatestLSTimeSplit?.split(":")[0]),
      Number(LatestLSTimeSplit?.split(":")[1])
    );
    const LastGameTime = new Date(
      newEndDate.getFullYear(),
      newEndDate.getMonth(),
      newEndDate.getDate(),
      Number(UserEndTime?.split(":")[0]),
      Number(UserEndTime?.split(":")[1])
    );
    let TimeDifference =
      (LastGameTime.getTime() - LastLoadsheddingTime.getTime()) / 1000;
    let CalcTimeDifference = (TimeDifference /= 60);
    return MaxGameTime <= CalcTimeDifference
      ? ` Start Time: ${LatestLSTimeSplit} - ${CalcTimeDifference} MIN`
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
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        Number(startTime?.split(":")[0]),
        Number(startTime?.split(":")[1])
      );
      const end = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        Number(endTime?.split(":")[0]),
        Number(endTime?.split(":")[1])
      );
      let diff = (end.getTime() - start.getTime()) / 1000;

      let pStart = (diff /= 60);
      if (MaxGameTime > pStart) continue;
      LSTimes.push(`Start Time: ${startTime} - ${pStart} MIN`);
    }
    return LSTimes;
  };
  static calcAllTimes = (
    LSTIMES: string[],
    StartTime: string,
    EndTime: string,
    MaxPlanTime: number,
    EndDate: string
  ): any => {
    const InitialStartTime = this.getInitialStartTime(
      LSTIMES,
      StartTime,
      MaxPlanTime
    );
    const InitialEndTime = this.getInitialEndTimes(
      LSTIMES,
      EndTime,
      MaxPlanTime,
      EndDate.split("T")[0]!
    );
    const InbetweenTimes = this.getInbetweenTimes(LSTIMES, MaxPlanTime);
    console.log([[InitialStartTime], [...InbetweenTimes], [InitialEndTime]]);
    return [InitialStartTime, ...InbetweenTimes, InitialEndTime];
  };
}

export default TimeCalculations;
