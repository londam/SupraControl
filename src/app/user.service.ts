import { Injectable } from '@angular/core';
import { User } from './models/user';
import { FetchUsersService } from './fetch-users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fetchUsersService: FetchUsersService) {}

  // Return Observable from fetch service
  loadUsers(): Observable<User[]> {
    return this.fetchUsersService.getUsers(); // Return Observable directly
  }

  addUser(user: User, users: User[]): void {
    user.Id = users.length + 1;
    users.push(user);
  }

  updateUser(updatedUser: User, users: User[]): void {
    const index = users.findIndex((user) => user.Id === updatedUser.Id);
    if (index > -1) {
      users[index] = { ...updatedUser };
    }
  }

  deleteUser(userToDelete: User, users: User[]): void {
    users = users.filter((user) => user.Id !== userToDelete.Id);
  }
}
