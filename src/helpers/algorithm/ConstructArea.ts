class ConstructArea {
  private _Times: any;
  private _events: { stage: string; stage_start_timestamp: string }[] = [] as any;
  private _isEvents: boolean = false;
  private _planFilterDate: string = new Date().toLocaleDateString();
  private stageInfo: {
    name: string;
    next_stages: { stage: string; stage_start_timestamp: string }[];
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
      next_stages: { stage: string; stage_start_timestamp: string }[];
      stage: string;
      stage_updated: string;
    },
    planFilterDate: string
  ) {
    this._Times = areaData;
    this._events = stageInfo.next_stages;
    this._isEvents = stageInfo.next_stages.length > 0;
    this.stageInfo = stageInfo;
    this._planFilterDate = planFilterDate;
  }

  public constructData = (): string[] => {
    if (this._isEvents) {
      return this.handleEventConstruct();
    } else {
      return this.handleNoEventConstruct();
    }
  };

  private handleEventConstruct = (): string[] => {
    const stagesStack = this._events
      .filter((val: { stage: string; stage_start_timestamp: string }) => {
        return (
          (val.stage_start_timestamp.split("T")[0] as string) === this._planFilterDate
        );
      })
      .map((val: { stage: string; stage_start_timestamp: string }) => {
        return +val.stage;
      });

    let instanceStage: number;
    if (stagesStack.length === 0 || !stagesStack) {
      instanceStage = +this.stageInfo?.stage;
    } else {
      instanceStage = stagesStack.reduce((a: number, b: number) => {
        return Math.max(a, b);
      });
    }

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

export default ConstructArea;
