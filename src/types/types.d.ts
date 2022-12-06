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

export type FilterTime = {
  startDate: string;
  endTime: string;
  startTime: string;
};

export type FilterData = {
  members: string[];
  teams: string[];
  filterInputs?: FilterTime;
};

export type PlanFilterType = {
  members: FilterData.members;
  teams: FilterData.teams;
  filterSettings?: FilterTime;
  invitedData?: string[];
  onFilter: (filterData: FilterData) => void;
  removeUserCB: (userId: string) => void;
};

export type PlanInvitedType = {
  invitedTeams: string[];
  invitedUsers: string[];
};
