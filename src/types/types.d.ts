export interface IInviteData {
  plan_id: string;
  invitedBy: [string, string];
}

export interface IAreaData {
  id: string | null;
  name: string | null;
  region: string | null;
}

export type Variants = 'ls' | 'availible' | 'buffer';

export type FilterTime = {
  startDate: string;
  endTime: string;
  startTime: string;
  minPlanTime: number;
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
  refetchPlanData?: () => void;
  toggleFilter?: React.Dispatch<React.SetStateAction<boolean>>;
  filterVisible?: boolean;
};

export type PlanInvitedType = {
  invitedTeams: string[];
  invitedUsers: string[];
};

export type Info = {
  plan_createdAt: string;
  user_id: string;
  plan_lsTimes: string[];
  plan_authorizedTeams: string[];
  plan_authorizedUsers: string[];
  plan_InvitedData: string[];
};
