export interface Role {
  Id: number;
  Name: string;
  Level: number;
}

export const ROLEOPTIONS = {
  Administrator: { Id: 2, Name: 'Administrator', Level: 99 },
  User: { Id: 1, Name: 'User', Level: 10 },
  Moderator: { Id: 3, Name: 'Moderator', Level: 55 },
  Owner: { Id: 6, Name: 'Owner', Level: 100 },
};
