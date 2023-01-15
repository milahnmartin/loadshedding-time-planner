import { toast } from "react-toastify";

type TimeScope = {
  start: string;
  end: string;
  date: string;
};

class ConstructArea {
  private _Times: any;
  private _events: string[] = [];
  private _isEvents: boolean = false;
  private stageInfo: {
    name: string;
    next_stages: string[];
    stage: string;
    stage_updated: string;
  };
  constructor(
    areaData: {
      timeData: { date: string; name: string; stages: string[][] };
      stageRegion: "eskom" | "capetown";
    }[],
    stageInfo: {
      name: string;
      next_stages: string[];
      stage: string;
      stage_updated: string;
    }
  ) {
    this._Times = areaData;
    this._events = stageInfo.next_stages;
    this._isEvents = stageInfo.next_stages.length > 0;
    this.stageInfo = stageInfo;
  }

  public constructData = (): string[] => {
    if (this._isEvents) {
      return this.handleEventConstruct();
    } else {
      return this.handleNoEventConstruct();
    }
  };

  private handleEventConstruct = (): string[] => {
    const instanceStage = +this.stageInfo?.stage;
    return this._Times.flatMap(
      (time: { timeData: { date: string; name: string; stages: string[][] }[] }) => {
        return time?.timeData[0]?.stages[instanceStage + 1];
      }
    );
  };
  private handleNoEventConstruct = (): string[] => {
    const instanceStage = +this.stageInfo?.stage;
    return this._Times.flatMap(
      (time: { timeData: { date: string; name: string; stages: string[][] }[] }) => {
        return time?.timeData[0]?.stages[instanceStage + 1];
      }
    );
  };
}
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
        next_stages: string[];
        stage: string;
        stage_updated: string;
      };
      eskom: {
        name: string;
        next_stages: string[];
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
          stages?.capetown
        ).constructData(),
        ...new ConstructArea(
          this.handleSortArea("esk", LSTimes),
          stages?.eskom
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

  private calcBufferTimes = (
    planFilterDate: Date,
    planFilterDateEnd: Date
  ): string[] | null => {
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

    return null;
  };
  private calcAvailableTimes = (
    planFilterDate: Date,
    planFilterDateEnd: Date
  ): string[] | null => {
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

    return null;
  };

  public constructTimes = (): any => {
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
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date(date).getDate() + 1,
      +end.split(":")[0]!,
      +end.split(":")[1]!
    );

    return [
      this.calcAvailableTimes(planFilterDate, planFilterDateEnd),
      this.calcBufferTimes(planFilterDate, planFilterDateEnd),
      this._filteredTimes,
    ];
  };
}

export default TimeCalc;
