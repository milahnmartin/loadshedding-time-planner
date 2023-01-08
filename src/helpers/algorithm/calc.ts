class TimeCalc {
  private _times: Set<string>;
  private _filteredTimes: string[];
  constructor(LSTimes: string[]) {
    this._times = new Set(LSTimes);
    console.log(this._times);
    this._filteredTimes = [];
  }

  private sortTimes = (): void => {};
  public handleCalculation = (): TimeCalc => {
    if (this._times.size === 1) {
      this._filteredTimes = [this._times.values().next().value];
    }
    return this;
  };

  public get times(): string[] {
    return this._filteredTimes;
  }
}

export default TimeCalc;
