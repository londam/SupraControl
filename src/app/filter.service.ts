import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  filterByRoles(users: User[], selectedRoles: string[]): User[] {
    if (selectedRoles.length === 0) return users; // No filter applied
    let fileteredUsers = users.filter((user) =>
      user.RoleNames?.some((r) => selectedRoles.includes(r))
    );
    return fileteredUsers;
  }

  filterBySearch(users: User[], query: string): User[] {
    if (!query) return users;
    return users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
  }
}
