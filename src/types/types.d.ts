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
  endTime: { date: string; time: string };
}

export interface IPlan {
  plan_id: string;
  plan_lsTimes: string | string[];
  plan_authorizedUsers: string | string[];
  plan_authorizedTeams: string | string[];
  user_id: string;
}

export interface UserSavedDates {
  times: string[][];
  dates: string[];
}

export interface IInviteData {
  plan_id: string;
  invitedBy: [string, string];
}

export interface IAreaData {
  id: string | null;
  name: string | null;
  region: string | null;
}

export type Variants = "ls" | "availible" | "buffer";
