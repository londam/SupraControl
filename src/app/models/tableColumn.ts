import { User } from './user';

export interface TableColumn {
  field: keyof User;
  caption: string;
  allowSorting: boolean;
  filterValue?: string;
  width?: number;
}

export const TABLECOLUMNS: TableColumn[] = [
  { field: 'FirstName', caption: 'IME', allowSorting: true, width: 100 },
  { field: 'LastName', caption: 'PREZIME', allowSorting: true, width: 100 },
  { field: 'Email', caption: 'EMAIL', allowSorting: true, width: 100 },
  { field: 'Phone', caption: 'TELEFON', allowSorting: true, width: 100 },
  { field: 'RoleNames', caption: 'ROLE', allowSorting: true, width: 200 },
  {
    field: 'WorkPlace',
    caption: 'RADNO MJESTO',
    allowSorting: true,
    width: 100,
  },
  { field: 'Country', caption: 'DRŽAVA', allowSorting: true, width: 100 },
  { field: 'City', caption: 'GRAD', allowSorting: true, width: 100 },
];
