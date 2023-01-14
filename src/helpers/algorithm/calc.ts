type TimeScope = {
  start: string;
  end: string;
  date: Date;
};

type TLSTimes = {
  capeTown: {
    times: string[];
    events?: string[];
  };
  eskom: {
    times: string[];
    events?: string[];
  };
};

class CapeTown {
  private _cpTimes: string[] = [];
  private _events: string[] = [];
  private _isEvents: boolean = false;
  constructor(cpTimes: string[], events: string[]) {
    this._cpTimes = cpTimes;
    this._events = events;
    this._isEvents = events.length > 0;
  }

  private constructData = (): this => {
    if (this._isEvents) {
      this.handleEventConstruct();
    } else {
      this.handleNoEventConstruct();
    }

    return this;
  };

  private handleEventConstruct = () => {};
  private handleNoEventConstruct = () => {};
}
class Eskom {
  private _esTimes: string[] = [];
  private _events: string[] = [];
  private _isEvents: boolean = false;
  constructor(esTimes: string[], events: string[]) {
    this._esTimes = esTimes;
    this._events = events;
    this._isEvents = events.length > 0;
    this.constructData();
  }

  private constructData = (): void => {
    if (this._isEvents) {
      this.handleEventConstruct();
    } else {
      this.handleNoEventConstruct();
    }
  };

  private handleEventConstruct = () => {};
  private handleNoEventConstruct = () => {};
}
class TimeCalc {
  private _times: {
    cpt: Set<string>;
    eskom: Set<string>;
  };
  private _filteredTimes: string[] = [];
  private _timeScope: TimeScope;
  constructor(LSTimes: TLSTimes, timeScope: TimeScope) {
    this._timeScope = timeScope;
    this._times = {
      cpt: new Set(LSTimes.capeTown.times),
      eskom: new Set(LSTimes.eskom.times),
    };
  }

  private sortTimes = (times: string[]): this => {
    this._filteredTimes = times.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return this;
  };

  public handleCapeTown = (): this => {
    return this;
  };
  public handleEskom = (): this => {
    return this;
  };

  public get times(): string[] {
    return this._filteredTimes;
  }
}

export default TimeCalc;
