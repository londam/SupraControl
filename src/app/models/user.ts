import { Role } from './role';

export interface User {
  Id: number;
  FirstName?: string;
  LastName?: string;
  Roles?: Role[];
  RoleNames?: string[];
  Email?: string;
  CreatedOn?: string;
  EditedOn?: string;
  Enabled?: string;
  LastActivityOn?: string;
  LastLoginOn?: string;
  OTP2FAEnabled?: string;
  Phone?: string;
  Username?: string;
  WrongPasswordCount?: string;
  WorkPlace?: string;
  Country?: string;
  City?: string;
  Gender?: string;
  Notes?: string;
  Address?: string;
  Password?: string;
  ConfirmPassword?: string;
}
