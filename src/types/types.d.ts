export interface IGameData {}

export interface IuseFetch {
  data: IGameData | null;
  loading: boolean;
}

export interface ILoadsheddingInfo {
  group: Number;
  location: string;
  time: string[];
}

export interface IUserStateData {
  name: string;
  gamerTag: string;
  loadsheddingInfo: ILoadsheddingInfo;
}

export interface IStartEndTimes {
  startTime: string;
  endTime: string;
}

export interface IPlan {
  lsTimes: string[];
  iniatedUser: string;
  customuuid: string;
  authorizedUser: string[];
}
