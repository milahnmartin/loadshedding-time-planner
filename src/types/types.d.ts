export interface IGameData {}

export interface IuseFetch {
  data: IGameData | null;
  loading: boolean;
}

export interface ILoadsheddingInfo {
  group: Number;
  location: String;
  time: String[];
}

export interface IUserStateData {
  name: string;
  gamerTag: string;
  loadsheddingInfo: ILoadsheddingInfo;
}
