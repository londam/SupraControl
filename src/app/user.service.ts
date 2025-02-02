import { Injectable } from '@angular/core';
import { User } from './models/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  private users: User[] = USERS; // Static data for now, could be fetched from an API

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index > -1) {
      this.users[index] = { ...updatedUser };
    }
  }

  deleteUser(userToDelete: User): void {
    this.users = this.users.filter((user) => user.id !== userToDelete.id);
  }
}

// MOCK DATA
const USERS: User[] = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    role: ['User', 'Admin'],
    email: 'john@example.com',
  },
  {
    id: 2,
    name: 'Jane',
    surname: 'Smith',
    role: ['User', 'Admin'],
    email: 'jane@example.com',
  },
  {
    id: 3,
    name: 'Stim',
    surname: 'Jubilee',
    role: ['User'],
    email: 'stim@example.com',
  },
  {
    id: 4,
    name: 'Robert',
    surname: 'Johnson',
    role: ['Moderator'],
    email: 'robert@example.com',
  },
];
