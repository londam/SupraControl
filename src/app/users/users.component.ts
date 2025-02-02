import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { ModalService } from '../modal.service';
import { FilterService } from '../filter.service';
import { TableColumn, TABLECOLUMNS } from '../models/tableColumn';
import { ROLEOPTIONS } from '../models/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  //users shown at any time in the datagrid
  filteredUsers: User[] = [];

  //Roles selected in tag box
  selectedRoles: string[] = [];

  searchQuery: string = '';

  //Manually selected users (for deleting or editing)
  selectedUsers: User[] = [];

  columns: TableColumn[] = TABLECOLUMNS;
  roleOptions: string[] = Object.keys(ROLEOPTIONS);

  isSearchVisible: boolean = false;

  constructor(
    private userService: UserService,
    public modalService: ModalService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    // Subscribe to loadUsers and handle the data
    this.userService.loadUsers().subscribe({
      next: (data) => {
        this.users = data.map((user) => ({
          ...user,
          RoleNames: user.Roles?.map((role) => role.Name), // Convert list of objects to list of strings
        }));
        this.filteredUsers = [...this.users]; // Initialize filtered users
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
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
      this.selectedUsers.forEach((user) =>
        this.userService.deleteUser(user, this.users)
      );
      this.applyFiltersToUsers();
    }
  }

  onAddNewUser() {
    this.modalService.openModal();
  }

  saveUser(user: User) {
    if (user.Id) {
      this.userService.updateUser(user, this.users);
    } else {
      this.userService.addUser(user, this.users);
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
