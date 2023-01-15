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
    return [];
  };
  private handleNoEventConstruct = (): string[] => {
    const instanceStage = +this.stageInfo?.stage;
    return this._Times
      .map((time: { timeData: { date: string; name: string; stages: string[][] }[] }) => {
        return time?.timeData[0]?.stages[instanceStage + 1];
      })
      .flat();
  };
}
class TimeCalc {
  private _finalData: string[] = [];
  public _filteredTimes: string[] = [];
  private _timeScope: TimeScope;

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
    );
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

  private sortTimes = (times: string[]): this => {
    this._filteredTimes = times.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return this;
  };

  public constructTimes = (): string[][] => {
    return [["12:00"], ["12:00"], ["12:00"]];
  };
}

export default TimeCalc;
