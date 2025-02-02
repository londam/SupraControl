import { Component } from '@angular/core';
import { TableColumn, User } from '../models/types';
import { UserService } from '../user.service';
import { ModalService } from '../modal.service';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  //users shown at any time in the datagrid - we can't assign function to datagrid
  //TODO - change this into function!
  filteredUsers: User[] = [];

  //Roles selected in tag box
  selectedRoles: string[] = [];

  searchQuery: string = '';

  //Manually selected users (for deleting or editing)
  selectedUsers: User[] = [];

  columns: TableColumn[] = TABLECOLUMNS;
  roleOptions: string[] = ROLEOPTIONS;

  isSearchVisible: boolean = false;

  constructor(
    private userService: UserService,
    public modalService: ModalService,
    private filterService: FilterService
  ) {
    this.users = this.userService.getUsers();
    this.filteredUsers = [...this.users];
  }

  // Update filtered users based on selected roles and search query
  applyFiltersToUsers() {
    let filteredByRoles = this.filterService.filterByRoles(
      this.users,
      this.selectedRoles
    );
    this.filteredUsers = this.filterService.filterBySearch(
      filteredByRoles,
      this.searchQuery
    );
  }

  // Toggle search visibility
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) this.searchQuery = '';
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.applyFiltersToUsers();
  }

  // Update filtered users based on selected roles
  onRoleFilterChanged() {
    this.applyFiltersToUsers();
  }

  onEditUser() {
    if (this.selectedUsers.length === 1) {
      this.modalService.openModal(this.selectedUsers[0]);
    }
  }

  onDeleteUser() {
    if (this.selectedUsers.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${this.selectedUsers.length} user(s)?`
      )
    ) {
      this.selectedUsers.forEach((user) => this.userService.deleteUser(user));
      this.applyFiltersToUsers();
    }
  }

  onAddNewUser() {
    this.modalService.openModal();
  }

  saveUser(user: User) {
    if (user.id) {
      this.userService.updateUser(user);
    } else {
      this.userService.addUser(user);
    }
    this.applyFiltersToUsers();
    this.modalService.closeModal();
  }

  // Close modal after edit or add new user
  closeModal() {
    this.modalService.closeModal();
  }

  // Handle selection of users in the DataGrid
  onSelectionChanged(event: any) {
    this.selectedUsers = event.selectedRowsData;
  }
}

const TABLECOLUMNS: TableColumn[] = [
  { field: 'name', caption: 'Name', allowSorting: true },
  { field: 'surname', caption: 'Surname', allowSorting: true },
  { field: 'role', caption: 'Role', allowSorting: true },
];

const ROLEOPTIONS: string[] = ['Admin', 'User', 'Moderator'];
