import { toast } from "react-toastify";

type TimeScope = {
  start: string;
  end: string;
  date: string;
};

class ConstructArea {
  private _Times: string[] = [];
  private _events: string[] = [];
  private _isEvents: boolean = false;
  constructor(areaData: any, stageInfo: any) {
    console.log(areaData);
    this._Times = areaData.times;
    this._events = areaData.events || [];
    this._isEvents = !areaData?.events ? false : areaData.events.length > 0;
  }

  public constructData = (): string[] => {
    if (this._isEvents) {
      return this.handleEventConstruct();
    } else {
      return this.handleNoEventConstruct();
    }
  };

  private handleEventConstruct = (): string[] => {};
  private handleNoEventConstruct = (): string[] => {};
}
class TimeCalc {
  private _finalData: string[] = [];
  private _filteredTimes: string[] = [];
  private _timeScope: TimeScope;

  constructor(LSTimes: any, timeScope: TimeScope, stages: any) {
    this._timeScope = timeScope;
    this._filteredTimes = [
      ...new ConstructArea(
        this.handleSortArea("cpt", LSTimes),
        stages?.capetown
      ).constructData(),
      ...new ConstructArea(
        this.handleSortArea("esk", LSTimes),
        stages?.eskom
      ).constructData(),
    ];
  }

  private handleSortArea = (area: "cpt" | "esk", users: any): any => {
    if (area === "cpt") {
      return users.filter((time: any) => time.stageRegion === "capetown");
    }
    if (area === "esk") {
      return users.filter((time: any) => time.stageRegion === "eskom");
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
