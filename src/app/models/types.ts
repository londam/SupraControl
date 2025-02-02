export interface User {
  id: number;
  name: string;
  surname: string;
  role: string[];
  email: string;
  // Other properties as needed
}

export interface TableColumn {
  field: keyof User;
  caption: string;
  allowSorting: boolean;
  filterValue?: string;
  width?: number;
}
