import ConstructArea from '@helpers/algorithm/ConstructArea';
import { toast } from 'react-toastify';
type TimeScope = {
  start: string;
  end: string;
  date: string;
};

class TimeCalc {
  public _filteredTimes: string[] = [];
  private _timeScope: TimeScope;
  public minPlanTime: number = 40;
  private _timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  } as const;
  constructor(
    LSTimes: {
      timeData: { date: string; name: string; stages: string[][] };
      stageRegion: 'eskom' | 'capetown';
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
    },
    minPlanTime: number
  ) {
    this._timeScope = timeScope;
    this._filteredTimes = Array.from(
      new Set([
        ...new ConstructArea(
          this.handleSortArea('cpt', LSTimes),
          stages?.capetown,
          this._timeScope.date
        ).constructData(),
        ...new ConstructArea(
          this.handleSortArea('esk', LSTimes),
          stages?.eskom,
          this._timeScope.date
        ).constructData(),
      ])
    ).sort();
    this.minPlanTime = minPlanTime;
  }

  private handleSortArea = (area: 'cpt' | 'esk', users: any): any => {
    if (area === 'cpt') {
      return users.filter(
        (data: {
          timeData: { date: string; name: string; stages: string[][] };
          stageRegion: 'eskom' | 'capetown';
        }) => {
          return data.stageRegion === 'capetown';
        }
      );
    }
    if (area === 'esk') {
      return users.filter(
        (data: {
          timeData: { date: string; name: string; stages: string[][] };
          stageRegion: 'eskom' | 'capetown';
        }) => {
          return data.stageRegion === 'eskom';
        }
      );
    }
    toast.error('Something went wrong, please try again later');
  };

  private calcBufferTimes = (
    planFilterDate: Date,
    planFilterDateEnd: Date
  ): string[] => {
    const { date } = this._timeScope;
    planFilterDate.setMinutes(planFilterDate.getMinutes() - 30);
    planFilterDateEnd.setMinutes(planFilterDateEnd.getMinutes() + 30);
    if (this._filteredTimes.length === 0) {
      const calcTime = planFilterDateEnd.getTime() - planFilterDate.getTime();
      const calcTimeHours = calcTime / (1000 * 60 * 60);
      const hoursRounded = Math.floor(calcTimeHours);
      const minutes = (calcTimeHours - hoursRounded) * 60;
      const minutesRounded = Math.floor(minutes);
      const seconds = Math.round((minutes - minutesRounded) * 60);

      const minPlanTimeCalc: boolean =
        hoursRounded * 60 + minutesRounded >= this.minPlanTime;
      if (minPlanTimeCalc) {
        return [
          `${planFilterDate.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} - ${planFilterDateEnd.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} @ ${hoursRounded} hours, ${minutesRounded} minutes, ${seconds} seconds`,
        ];
      }
    }
    if (this._filteredTimes.length === 1 && this._filteredTimes[0]) {
      const availableTimes = [] as string[];
      const [LSStart, LSEnd] = this._filteredTimes[0]!.split('-');
      console.log(`DEV LOG - ${LSStart} - ${LSEnd}`);
      const [LSStartHour, LSStartMin] = LSStart?.split(':')!;
      const [LSEndHour, LSEndMin] = LSEnd?.split(':')!;
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

      onlyLSStart.setMinutes(onlyLSStart.getMinutes() + 30);
      onlyLSEnd.setMinutes(onlyLSEnd.getMinutes() - 30);
      const initialDifTime = onlyLSStart.getTime() - planFilterDate.getTime();
      if (initialDifTime > 0) {
        const initialDifTimeHours = initialDifTime / (1000 * 60 * 60);
        const initialDifTimeRounded = Math.floor(initialDifTimeHours);
        const initialDifTimeMin =
          (initialDifTimeHours - initialDifTimeRounded) * 60;
        const initialDifTimeMinRounded = Math.floor(initialDifTimeMin);
        const initialDifTimeSeconds = Math.round(
          (initialDifTimeMin - initialDifTimeMinRounded) * 60
        );

        const calcminPlanTime =
          initialDifTimeRounded * 60 + initialDifTimeMinRounded >=
          this.minPlanTime;
        if (calcminPlanTime) {
          availableTimes.push(
            `${planFilterDate.toLocaleTimeString(
              'en-ZA',
              this._timeOptions
            )} - ${onlyLSStart.toLocaleTimeString(
              'en-ZA',
              this._timeOptions
            )} @ ${initialDifTimeRounded} hours, ${initialDifTimeMinRounded} minutes, ${initialDifTimeSeconds} seconds`
          );
        }
      }

      const finalDifTime = planFilterDateEnd.getTime() - onlyLSEnd.getTime();
      if (finalDifTime > 0) {
        const initialDifTimeHours = finalDifTime / (1000 * 60 * 60);
        const initialDifTimeRounded = Math.floor(initialDifTimeHours);
        const initialDifTimeMin =
          (initialDifTimeHours - initialDifTimeRounded) * 60;
        const initialDifTimeMinRounded = Math.floor(initialDifTimeMin);
        const initialDifTimeSeconds = Math.round(
          (initialDifTimeMin - initialDifTimeMinRounded) * 60
        );
        const calcminPlanTime =
          initialDifTimeRounded * 60 + initialDifTimeMinRounded >=
          this.minPlanTime;
        if (calcminPlanTime) {
          availableTimes.push(
            `${onlyLSEnd.toLocaleTimeString(
              'en-ZA',
              this._timeOptions
            )} - ${planFilterDateEnd.toLocaleTimeString(
              'en-ZA',
              this._timeOptions
            )} @ ${initialDifTimeRounded} hours, ${initialDifTimeMinRounded} minutes, ${initialDifTimeSeconds} seconds`
          );
        }
      }
      return availableTimes;
    }

    // if filteredTimes is above 1

    const availableTimes = [] as string[];

    for (
      let timeCount = 0;
      timeCount < this._filteredTimes.length;
      timeCount++
    ) {
      if (!this._filteredTimes[timeCount + 1]) break;
      const [LSStart, LSEnd] = this._filteredTimes[timeCount]!.split('-');
      if (timeCount === 0) {
        const [LSStartHour, LSStartMin] = LSStart?.split(':')!;
        const initialLsStart = new Date(
          new Date(date).getFullYear(),
          new Date(date).getMonth(),
          new Date(date).getDate(),
          +LSStartHour!,
          +LSStartMin!
        );
        initialLsStart.setMinutes(initialLsStart.getMinutes() + 30);
        const initialDifTime =
          planFilterDate.getTime() - initialLsStart.getTime();

        if (initialDifTime > 0) {
          const initialDifTimeHours = initialDifTime / (1000 * 60 * 60);
          const initialDifTimeRounded = Math.floor(initialDifTimeHours);
          const initialDifTimeMin =
            (initialDifTimeHours - initialDifTimeRounded) * 60;
          const initialDifTimeMinRounded = Math.floor(initialDifTimeMin);
          const initialDifTimeSeconds = Math.round(
            (initialDifTimeMin - initialDifTimeMinRounded) * 60
          );

          const calcminPlanTime =
            initialDifTimeRounded * 60 + initialDifTimeMinRounded >=
            this.minPlanTime;

          if (calcminPlanTime) {
            availableTimes.push(
              `${planFilterDate.toLocaleTimeString(
                'en-ZA',
                this._timeOptions
              )} - ${initialLsStart.toLocaleTimeString(
                'en-ZA',
                this._timeOptions
              )} @ ${initialDifTimeRounded} hours, ${initialDifTimeMinRounded} minutes, ${initialDifTimeSeconds} seconds`
            );
          }
        }
        continue;
      }

      const [nextLSStart, nextLSEnd] =
        this._filteredTimes[timeCount + 1]!.split('-');
      const [LSStartHour, LSStartMin] = nextLSStart?.split(':')!;
      const [LSEndHour, LSEndMin] = LSEnd?.split(':')!;
      const nextLsStart = new Date(
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

      nextLsStart.setMinutes(nextLsStart.getMinutes() - 30);
      onlyLSEnd.setMinutes(onlyLSEnd.getMinutes() + 30);

      const lsTimediff = nextLsStart.getTime() - onlyLSEnd.getTime();
      const lsTimediffHours = lsTimediff / (1000 * 60 * 60);
      const lsTimediffRounded = Math.floor(lsTimediffHours);
      const lsTimediffMin = (lsTimediffHours - lsTimediffRounded) * 60;
      const lsTimediffMinRounded = Math.floor(lsTimediffMin);
      const lsTimediffSeconds = Math.round(
        (lsTimediffMin - lsTimediffMinRounded) * 60
      );

      const minIterationCalcTime =
        lsTimediffRounded * 60 + lsTimediffMinRounded >= this.minPlanTime;

      if (!minIterationCalcTime) continue;

      if (lsTimediff > 0) {
        availableTimes.push(
          `${onlyLSEnd.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} - ${nextLsStart.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} @ ${lsTimediffRounded} hours, ${lsTimediffMinRounded} minutes, ${lsTimediffSeconds} secs`
        );
      }
    }
    // the bottom is the last checks

    let lastLsTime = this._filteredTimes[this._filteredTimes.length - 1]!;
    if (!lastLsTime) {
      for (let i = this._filteredTimes.length - 2; i >= 0; i--) {
        if (this._filteredTimes[i]) {
          lastLsTime = this._filteredTimes[i]!;
          break;
        }
        return availableTimes;
      }
    }
    const [LSStart, LSEnd] = lastLsTime.split('-');
    const [LSEndHour, LSEndMin] = LSEnd?.split(':')!;
    const onlyLSEnd = new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth(),
      new Date(date).getDate(),
      +LSEndHour!,
      +LSEndMin!
    );

    onlyLSEnd.setMinutes(onlyLSEnd.getMinutes() - 30);
    // this checks the planfilters end time vs the last ls time
    const finalDifTime = planFilterDateEnd.getTime() - onlyLSEnd.getTime();
    if (finalDifTime > 0) {
      const initialDifTimeHours = finalDifTime / (1000 * 60 * 60);
      const initialDifTimeRounded = Math.floor(initialDifTimeHours);
      const initialDifTimeMin =
        (initialDifTimeHours - initialDifTimeRounded) * 60;
      const initialDifTimeMinRounded = Math.floor(initialDifTimeMin);
      const initialDifTimeSeconds = Math.round(
        (initialDifTimeMin - initialDifTimeMinRounded) * 60
      );

      const calcEndMinTime =
        initialDifTimeRounded * 60 + initialDifTimeMinRounded >=
        this.minPlanTime;
      if (calcEndMinTime) {
        availableTimes.push(
          `${onlyLSEnd.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} - ${planFilterDateEnd.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} @ ${initialDifTimeRounded} hours, ${initialDifTimeMinRounded} minutess, ${initialDifTimeSeconds} yep`
        );
      }
    }

    return availableTimes;
  };
  private calcAvailableTimes = (
    planFilterDate: Date,
    planFilterDateEnd: Date
  ): string[] => {
    const { date } = this._timeScope;
    if (this._filteredTimes.length === 0) {
      const calcTime = planFilterDateEnd.getTime() - planFilterDate.getTime();
      const calcTimeHours = calcTime / (1000 * 60 * 60);
      const hoursRounded = Math.floor(calcTimeHours);
      const minutes = (calcTimeHours - hoursRounded) * 60;
      const minutesRounded = Math.floor(minutes);
      const seconds = Math.round((minutes - minutesRounded) * 60);

      const calcminPlanTime =
        hoursRounded * 60 + minutesRounded >= this.minPlanTime;

      if (calcminPlanTime) {
        return [
          `${planFilterDate.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} - ${planFilterDateEnd.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} @ ${hoursRounded} hours, ${minutesRounded} minutes, ${seconds} seconds`,
        ];
      }
    }
    if (this._filteredTimes.length === 1 && this._filteredTimes[0]) {
      const availableTimes = [] as string[];
      const [LSStart, LSEnd] = this._filteredTimes[0]!.split('-');
      const [LSStartHour, LSStartMin] = LSStart?.split(':')!;
      const [LSEndHour, LSEndMin] = LSEnd?.split(':')!;
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
        const initialDifTimeMin =
          (initialDifTimeHours - initialDifTimeRounded) * 60;
        const initialDifTimeMinRounded = Math.floor(initialDifTimeMin);
        const initialDifTimeSeconds = Math.round(
          (initialDifTimeMin - initialDifTimeMinRounded) * 60
        );

        const calcminPlanTime =
          initialDifTimeRounded * 60 + initialDifTimeMinRounded >=
          this.minPlanTime;

        if (calcminPlanTime) {
          availableTimes.push(
            `${planFilterDate.toLocaleTimeString(
              'en-ZA',
              this._timeOptions
            )} - ${onlyLSStart.toLocaleTimeString(
              'en-ZA',
              this._timeOptions
            )} @ ${initialDifTimeRounded} hours, ${initialDifTimeMinRounded} minutes, ${initialDifTimeSeconds} seconds`
          );
        }
      }

      const finalDifTime = planFilterDateEnd.getTime() - onlyLSEnd.getTime();
      console.log(planFilterDateEnd);
      console.log(onlyLSEnd);
      if (finalDifTime > 0) {
        const initialDifTimeHours = finalDifTime / (1000 * 60 * 60);
        const initialDifTimeRounded = Math.floor(initialDifTimeHours);
        const initialDifTimeMin =
          (initialDifTimeHours - initialDifTimeRounded) * 60;
        const initialDifTimeMinRounded = Math.floor(initialDifTimeMin);
        const initialDifTimeSeconds = Math.round(
          (initialDifTimeMin - initialDifTimeMinRounded) * 60
        );

        const minIterationCalcTime =
          initialDifTimeRounded * 60 + initialDifTimeMinRounded >=
          this.minPlanTime;

        if (minIterationCalcTime) {
          availableTimes.push(
            `${onlyLSEnd.toLocaleTimeString(
              'en-ZA',
              this._timeOptions
            )} - ${planFilterDateEnd.toLocaleTimeString(
              'en-ZA',
              this._timeOptions
            )} @ ${initialDifTimeRounded} hours, ${initialDifTimeMinRounded} minutes, ${initialDifTimeSeconds} seconds`
          );
        }
      }
      return availableTimes;
    }

    // now this will run below when there are more than 1 filtered times
    const availableTimes = [] as string[];

    for (
      let timeCount = 0;
      timeCount < this._filteredTimes.length;
      timeCount++
    ) {
      if (!this._filteredTimes[timeCount + 1]) break;
      const [LSStart, LSEnd] = this._filteredTimes[timeCount]!.split('-');
      if (timeCount === 0) {
        const [LSStartHour, LSStartMin] = LSStart?.split(':')!;
        const initialLsStart = new Date(
          new Date(date).getFullYear(),
          new Date(date).getMonth(),
          new Date(date).getDate(),
          +LSStartHour!,
          +LSStartMin!
        );

        const initialDifTime =
          planFilterDate.getTime() - initialLsStart.getTime();

        if (initialDifTime > 0) {
          const initialDifTimeHours = initialDifTime / (1000 * 60 * 60);
          const initialDifTimeRounded = Math.floor(initialDifTimeHours);
          const initialDifTimeMin =
            (initialDifTimeHours - initialDifTimeRounded) * 60;
          const initialDifTimeMinRounded = Math.floor(initialDifTimeMin);
          const initialDifTimeSeconds = Math.round(
            (initialDifTimeMin - initialDifTimeMinRounded) * 60
          );

          const calcminPlanTime =
            initialDifTimeRounded * 60 + initialDifTimeMinRounded >=
            this.minPlanTime;

          if (calcminPlanTime) {
            availableTimes.push(
              `${planFilterDate.toLocaleTimeString(
                'en-ZA',
                this._timeOptions
              )} - ${initialLsStart.toLocaleTimeString(
                'en-ZA',
                this._timeOptions
              )} @ ${initialDifTimeRounded} hours, ${initialDifTimeMinRounded} minutes, ${initialDifTimeSeconds} seconds`
            );
          }
        }
        continue;
      }

      const [nextLSStart, nextLSEnd] =
        this._filteredTimes[timeCount + 1]!.split('-');
      const [LSStartHour, LSStartMin] = nextLSStart?.split(':')!;
      const [LSEndHour, LSEndMin] = LSEnd?.split(':')!;
      const nextLsStart = new Date(
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
      const lsTimediff = nextLsStart.getTime() - onlyLSEnd.getTime();
      const lsTimediffHours = lsTimediff / (1000 * 60 * 60);
      const lsTimediffRounded = Math.floor(lsTimediffHours);
      const lsTimediffMin = (lsTimediffHours - lsTimediffRounded) * 60;
      const lsTimediffMinRounded = Math.floor(lsTimediffMin);
      const lsTimediffSeconds = Math.round(
        (lsTimediffMin - lsTimediffMinRounded) * 60
      );

      const minIterationCalcTime =
        lsTimediffRounded * 60 + lsTimediffMinRounded >= this.minPlanTime;

      if (!minIterationCalcTime) continue;
      if (lsTimediff > 0) {
        availableTimes.push(
          `${onlyLSEnd.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} - ${nextLsStart.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} @ ${lsTimediffRounded} hours, ${lsTimediffMinRounded} minutes, ${lsTimediffSeconds} secs`
        );
      }
    }
    // the bottom is the last checks

    let lastLsTime = this._filteredTimes[this._filteredTimes.length - 1]!;
    if (!lastLsTime) {
      for (let i = this._filteredTimes.length - 2; i >= 0; i--) {
        if (this._filteredTimes[i]) {
          lastLsTime = this._filteredTimes[i]!;
          break;
        }
        return availableTimes;
      }
    }
    const [LSStart, LSEnd] = lastLsTime.split('-');
    const [LSEndHour, LSEndMin] = LSEnd?.split(':')!;
    const onlyLSEnd = new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth(),
      new Date(date).getDate(),
      +LSEndHour!,
      +LSEndMin!
    );
    // this checks the planfilters end time vs the last ls time
    const finalDifTime = planFilterDateEnd.getTime() - onlyLSEnd.getTime();
    if (finalDifTime > 0) {
      const initialDifTimeHours = finalDifTime / (1000 * 60 * 60);
      const initialDifTimeRounded = Math.floor(initialDifTimeHours);
      const initialDifTimeMin =
        (initialDifTimeHours - initialDifTimeRounded) * 60;
      const initialDifTimeMinRounded = Math.floor(initialDifTimeMin);
      const initialDifTimeSeconds = Math.round(
        (initialDifTimeMin - initialDifTimeMinRounded) * 60
      );

      const calcEndMinTime =
        initialDifTimeRounded * 60 + initialDifTimeMinRounded >=
        this.minPlanTime;
      if (calcEndMinTime) {
        availableTimes.push(
          `${onlyLSEnd.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} - ${planFilterDateEnd.toLocaleTimeString(
            'en-ZA',
            this._timeOptions
          )} @ ${initialDifTimeRounded} hours, ${initialDifTimeMinRounded} minutess, ${initialDifTimeSeconds} yep`
        );
      }
    }

    return availableTimes;
  };

  public constructTimes = (): {
    availableTimes: string[];
    bufferTimes: string[];
    filteredTimes: string[];
  } => {
    const { start, end, date } = this._timeScope;
    // start and date is used in the planfilterdate
    const planFilterDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date(date).getDate(),
      +start.split(':')[0]!,
      +start.split(':')[1]!
    );

    const planFilterDateEnd = new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth(),
      new Date(date).getDate() + 1,
      +end.split(':')[0]!,
      +end.split(':')[1]!
    );

    return {
      availableTimes: this.calcAvailableTimes(
        planFilterDate,
        planFilterDateEnd
      ),
      bufferTimes: this.calcBufferTimes(planFilterDate, planFilterDateEnd),
      filteredTimes: [...this._filteredTimes],
    };
  };
}

export default TimeCalc;
