import ConstructArea from "@helpers/algorithm/ConstructArea";
import { toast } from "react-toastify";
type TimeScope = {
  start: string;
  end: string;
  date: string;
};

class TimeCalc {
  private _finalData: string[] = [];
  public _filteredTimes: string[] = [];
  private _timeScope: TimeScope;
  private _timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  } as const;
  constructor(
    LSTimes: {
      timeData: { date: string; name: string; stages: string[][] };
      stageRegion: "eskom" | "capetown";
    }[],
    timeScope: TimeScope,
    stages: {
      capetown: {
        name: string;
        next_stages: { stage: string; stage_start_timestamp: string }[];
        stage: string;
        stage_updated: string;
      };
      eskom: {
        name: string;
        next_stages: { stage: string; stage_start_timestamp: string }[];
        stage: string;
        stage_updated: string;
      };
    }
  ) {
    this._timeScope = timeScope;
    this._filteredTimes = Array.from(
      new Set([
        ...new ConstructArea(
          this.handleSortArea("cpt", LSTimes),
          stages?.capetown,
          this._timeScope.date
        ).constructData(),
        ...new ConstructArea(
          this.handleSortArea("esk", LSTimes),
          stages?.eskom,
          this._timeScope.date
        ).constructData(),
      ])
    ).sort();
  }

  private handleSortArea = (area: "cpt" | "esk", users: any): any => {
    if (area === "cpt") {
      return users.filter(
        (data: {
          timeData: { date: string; name: string; stages: string[][] };
          stageRegion: "eskom" | "capetown";
        }) => {
          return data.stageRegion === "capetown";
        }
      );
    }
    if (area === "esk") {
      return users.filter(
        (data: {
          timeData: { date: string; name: string; stages: string[][] };
          stageRegion: "eskom" | "capetown";
        }) => {
          return data.stageRegion === "eskom";
        }
      );
    }
    toast.error("Something went wrong, please try again later");
  };

  private calcBufferTimes = (planFilterDate: Date, planFilterDateEnd: Date): string[] => {
    if (this._filteredTimes.length === 0) {
      planFilterDate.setMinutes(planFilterDate.getMinutes() - 30);
      planFilterDateEnd.setMinutes(planFilterDateEnd.getMinutes() + 30);
      const calcTime = planFilterDateEnd.getTime() - planFilterDate.getTime();
      const calcTimeHours = calcTime / (1000 * 60 * 60);
      const hoursRounded = Math.floor(calcTimeHours);
      const minutes = (calcTimeHours - hoursRounded) * 60;
      const minutesRounded = Math.floor(minutes);
      const seconds = Math.round((minutes - minutesRounded) * 60);

      return [
        `${planFilterDate.toLocaleTimeString(
          "en-ZA",
          this._timeOptions
        )} - ${planFilterDateEnd.toLocaleTimeString(
          "en-ZA",
          this._timeOptions
        )} @ ${hoursRounded} hours, ${minutesRounded} minutes, ${seconds} seconds`,
      ];
    }

    return [];
  };
  private calcAvailableTimes = (
    planFilterDate: Date,
    planFilterDateEnd: Date
  ): string[] => {
    const { start, end, date } = this._timeScope;
    if (this._filteredTimes.length === 0) {
      const calcTime = planFilterDateEnd.getTime() - planFilterDate.getTime();
      const calcTimeHours = calcTime / (1000 * 60 * 60);
      const hoursRounded = Math.floor(calcTimeHours);
      const minutes = (calcTimeHours - hoursRounded) * 60;
      const minutesRounded = Math.floor(minutes);
      const seconds = Math.round((minutes - minutesRounded) * 60);

      return [
        `${planFilterDate.toLocaleTimeString(
          "en-ZA",
          this._timeOptions
        )} - ${planFilterDateEnd.toLocaleTimeString(
          "en-ZA",
          this._timeOptions
        )} @ ${hoursRounded} hours, ${minutesRounded} minutes, ${seconds} seconds`,
      ];
    }
    if (this._filteredTimes.length === 1 && this._filteredTimes[0]) {
      const availableTimes = [] as any;
      console.log(`DEV LOG - ${this._filteredTimes[0]}`);
      const [LSStart, LSEnd] = this._filteredTimes[0]!.split("-");
      const [LSStartHour, LSStartMin] = LSStart?.split(":")!;
      const [LSEndHour, LSEndMin] = LSEnd?.split(":")!;
      const onlyLSStart = new Date(
        new Date(date).getFullYear(),
        new Date(date).getMonth(),
        new Date(date).getDate(),
        +LSStartHour!,
        +LSStartMin!
      );
      const onlyLSEnd = new Date(
        new Date(date).getFullYear(),
        new Date(date).getMonth(),
        new Date(date).getDate(),
        +LSEndHour!,
        +LSEndMin!
      );

      const initialDifTime = onlyLSStart.getTime() - planFilterDate.getTime();
      if (initialDifTime > 0) {
        const initialDifTimeHours = initialDifTime / (1000 * 60 * 60);
        const initialDifTimeRounded = Math.floor(initialDifTimeHours);
        const initialDifTimeMin = (initialDifTimeHours - initialDifTimeRounded) * 60;
        const initialDifTimeMinRounded = Math.floor(initialDifTimeMin);
        const initialDifTimeSeconds = Math.round(
          (initialDifTimeMin - initialDifTimeMinRounded) * 60
        );
        availableTimes.push(
          `${planFilterDate.toLocaleTimeString(
            "en-ZA",
            this._timeOptions
          )} - ${onlyLSStart.toLocaleTimeString(
            "en-ZA",
            this._timeOptions
          )} @ ${initialDifTimeRounded} hours, ${initialDifTimeMinRounded} minutes, ${initialDifTimeSeconds} seconds`
        );
      }

      const finalDifTime = planFilterDateEnd.getTime() - onlyLSEnd.getTime();
      if (finalDifTime > 0) {
        const calcTimeHours = finalDifTime / (1000 * 60 * 60);
        const hoursRounded = Math.floor(calcTimeHours);
        const minutes = (calcTimeHours - hoursRounded) * 60;
        const minutesRounded = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesRounded) * 60);
        availableTimes.push(
          `${planFilterDate.toLocaleTimeString(
            "en-ZA",
            this._timeOptions
          )} - ${planFilterDateEnd.toLocaleTimeString(
            "en-ZA",
            this._timeOptions
          )} @ ${hoursRounded} hours, ${minutesRounded} minutes, ${seconds} seconds`
        );
      }
      return availableTimes;
    }

    return [];
  };

  public constructTimes = (
    signal: AbortSignal
  ): Promise<{
    availableTimes: string[];
    bufferTimes: string[];
    filteredTimes: string[];
  }> => {
    const { start, end, date } = this._timeScope;
    // start and date is used in the planfilterdate
    const planFilterDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date(date).getDate(),
      +start.split(":")[0]!,
      +start.split(":")[1]!
    );

    const planFilterDateEnd = new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth(),
      new Date(date).getDate() + 1,
      +end.split(":")[0]!,
      +end.split(":")[1]!
    );

    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject("Request aborted");
      }

      resolve({
        availableTimes: this.calcAvailableTimes(planFilterDate, planFilterDateEnd),
        bufferTimes: this.calcBufferTimes(planFilterDate, planFilterDateEnd),
        filteredTimes: [...this._filteredTimes],
      });
    });
  };
}

export default TimeCalc;
