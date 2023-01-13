type TimeScope = {
  start: string;
  end: string;
};

type TLSTimes = {
  capeTown: string[];
  eskom: string[];
};
class TimeCalc {
  private _times: Set<string>;
  private _filteredTimes: string[];
  private _timeScope: TimeScope;
  constructor(LSTimes: TLSTimes, timeScope: TimeScope) {
    this._times = new Set([...LSTimes.capeTown, ...LSTimes.eskom]);
    this._filteredTimes = [];
    this._timeScope = timeScope;
    this.handleCalculation();
  }

  private sortTimes = (times: string[]): this => {
    this._filteredTimes = times.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return this;
  };

  public handleCalculation = (): void => {
    if (this._times.size === 1) {
      this._filteredTimes = [this._times.values().next().value];
    } else {
      this._filteredTimes = Array.from(this._times);
    }
    this.sortTimes(this._filteredTimes);
  };

  public get times(): string[] {
    return this._filteredTimes;
  }
}

export default TimeCalc;
