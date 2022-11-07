type ResponseData = string | undefined[];
class TimeCalculations {
  static sortLoadSheddingTime = (times: string[]): string[] => {
    const unsortedTimes = Array.from(new Set(times));
    return unsortedTimes.sort() as string[];
  };

  static getInitialStartTime = (
    LoadSheddingTimes: string[],
    UserStartTime: string,
    MaxGameTime: number,
    endDate: string
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
    MaxGameTime: number
  ) => {
    const SortedLSTimes: string[] = this.sortLoadSheddingTime(LoadSheddingTimes);
    const LatestLSTime: string = SortedLSTimes[SortedLSTimes.length - 1]!;
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
      ? ` Start Time: ${LatestLSTimeSplit} - ${CalcTimeDifference} MIN`
      : undefined;
  };

  static getInbetweenTimes = (
    LoadSheddingTimes: string[],
    MaxGameTime: number
  ): string[] => {
    const LSTimes: string[] = [];
    const SortedLSTimes: string[] = this.sortLoadSheddingTime(LoadSheddingTimes);
    console.log(`LENGHT: ${SortedLSTimes.length}`);
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
    LSTIMES: any,
    StartTime: string,
    EndTime: string,
    MaxPlanTime: number,
    EndDate: string
  ): any => {
    if (LSTIMES.length === 0) return [];

    const mytimes = [];
    for (let info of LSTIMES) {
      mytimes.push(...info.times);
    }

    console.log(mytimes);
    const InitialStartTime = this.getInitialStartTime(
      mytimes,
      StartTime,
      MaxPlanTime,
      EndDate
    );
    const InitialEndTime = this.getInitialEndTimes(mytimes, EndTime, MaxPlanTime);
    const InbetweenTimes = this.getInbetweenTimes(mytimes, MaxPlanTime);
    return [InitialStartTime, ...InbetweenTimes, InitialEndTime];
  };
}

export default TimeCalculations;
