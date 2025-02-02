import { Component } from '@angular/core';
import { TableColumn, User } from '../models/types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = USERS;
  columns: TableColumn[] = TABLECOLUMNS;
  roleOptions: string[] = ROLEOPTIONS;

  //Roles selected in tag box
  selectedRoles: string[] = [];

  //users shown at any time in the datagrid - we can't assign function to datagrid
  filteredUsers: User[] = [...this.users];

  searchQuery: string = '';

  //Manually selected users (for deleting or editing)
  selectedUsers: User[] = [];
  selectedUser: User | null = null;

  isModalVisible: boolean = false;
  isSearchVisible: boolean = false;

  // Toggle search visibility
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) this.clearSearch();
  }

  // Handle search change
  onSearchChange(query: string) {
    this.searchQuery = query;
    this.filteredUsers = this.applyFiltersToUsers();
  }

  // Apply all active filters (search + role)
  applyFiltersToUsers(): User[] {
    return this.users
      .filter((user) => this.isRoleFiltered(user))
      .filter((user) => this.isSearchFiltered(user));
  }

  // Check if user matches selected roles
  isRoleFiltered(user: User): boolean {
    return (
      this.selectedRoles.length === 0 || this.selectedRoles.includes(user.role)
    );
  }

  // Check if user matches search query
  isSearchFiltered(user: User): boolean {
    if (!this.searchQuery) return true;
    return Object.values(user).some((value) =>
      String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Clear search and reset filter
  clearSearch() {
    this.searchQuery = '';
    this.filteredUsers = [...this.users];
  }

  // Action Handlers
  onEditUser() {
    if (this.selectedUsers.length === 1) {
      this.selectedUser = { ...this.selectedUsers[0] };
      this.isModalVisible = true;
    }
  }

  onDeleteUser() {
    if (
      !this.selectedUsers.length ||
      !confirm(`Delete ${this.selectedUsers.length} user(s)?`)
    )
      return;
    this.removeUsers(this.selectedUsers);
  }

  // Remove selected users
  removeUsers(usersToDelete: User[]) {
    this.filteredUsers = this.filteredUsers.filter(
      (user) => !usersToDelete.includes(user)
    );
    alert('User(s) deleted successfully!');
  }

  onAddNewUser() {
    this.selectedUser = null;
    this.isModalVisible = true;
  }

  // Update filtered users based on selected roles
  onRoleFilterChanged() {
    this.filteredUsers = this.applyFiltersToUsers();
  }

  // Close modal
  closeModal() {
    this.isModalVisible = false;
  }

  // Save user after editing or adding
  saveUser(user: User) {
    if (user.id) {
      this.users = this.users.map((u) => (u.id === user.id ? { ...user } : u));
    } else {
      user.id = this.users.length + 1;
      this.users.push(user);
    }
    this.filteredUsers = this.applyFiltersToUsers();
    this.closeModal();
  }

  // Handle selection of users in the DataGrid
  onSelectionChanged(event: any) {
    this.selectedUsers = event.selectedRowsData;
  }
}

// MOCK DATA
const USERS: User[] = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    role: 'Admin',
    email: 'john@example.com',
  },
  {
    id: 2,
    name: 'Jane',
    surname: 'Smith',
    role: 'User',
    email: 'jane@example.com',
  },
  {
    id: 3,
    name: 'Stim',
    surname: 'Jubilee',
    role: 'User',
    email: 'stim@example.com',
  },
  {
    id: 4,
    name: 'Robert',
    surname: 'Johnson',
    role: 'Moderator',
    email: 'robert@example.com',
  },
];

const TABLECOLUMNS: TableColumn[] = [
  { field: 'name', caption: 'Name', allowSorting: true },
  { field: 'surname', caption: 'Surname', allowSorting: true },
  { field: 'role', caption: 'Role', allowSorting: true },
];

const ROLEOPTIONS: string[] = ['Admin', 'User', 'Moderator'];
