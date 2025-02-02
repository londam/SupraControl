import { Component } from '@angular/core';
import { SelectionChangedEvent } from 'devextreme/ui/accordion';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  // Example Data
  users: User[] = USERS;
  // Columns in the DataGrid
  columns: TableColumn[] = TABLECOLUMNS;

  roleOptions = ROLEOPTIONS;

  filteredUsers: User[] = [...this.users]; // Filtered user list based on role selection
  selectedRoles: string[] = []; // Roles selected in the dropdown

  // Filtering functionality
  searchFilter: string = ''; // Filter value for real-time column search

  // Users selected by hand in the data grid
  selectedRows: User[] = [];

  // Action Button Handlers
  onEditUser() {
    console.log('Edit user clicked');
  }

  onDeleteUser() {
    const selectedUsers = this.selectedRows;
    if (selectedUsers.length === 0) {
      alert('No users selected for deletion.');
      return;
    }

    // Show a confirmation dialog
    const confirmation = window.confirm(
      `Are you sure you want to delete ${selectedUsers.length} user(s)?`
    );

    if (confirmation) {
      this.removeUsers(selectedUsers);
    }
  }

  // Remove users from the list
  removeUsers(usersToDelete: User[]) {
    this.filteredUsers = this.filteredUsers.filter(
      (user) => !usersToDelete.includes(user)
    );
    alert('User(s) deleted successfully!');
    // Later, add here to send a request to the server to delete the users
  }

  onAddNewUser() {
    console.log('Add new user clicked');
  }

  onSearchUsers() {
    console.log('Search clicked');
  }
  // Update filtered users based on selected roles
  onRoleFilterChanged() {
    if (this.selectedRoles.length === 0) {
      this.filteredUsers = [...this.users]; // No role selected, show all users
    } else {
      this.filteredUsers = this.users.filter((user) =>
        // Check if the user's role is included in the selected roles
        this.selectedRoles.some((role) => role === user.role)
      );
    }
  }

  // Handle selection of users in the DataGrid
  onSelectionChanged(event: any) {
    this.selectedRows = event.selectedRowsData;
    console.log('Selected Users:', this.selectedRows);
  }
}

// MOCK DATA
// MOCK DATA
// MOCK DATA
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
    id: 2,
    name: 'Stim',
    surname: 'Jubilee',
    role: 'User',
    email: 'jane@example.com',
  },
  // More users
];

const TABLECOLUMNS: TableColumn[] = [
  { field: 'name', caption: 'Name', allowSorting: true },
  { field: 'surname', caption: 'Surname', allowSorting: true },
  { field: 'role', caption: 'Role', allowSorting: true },
  // Add more columns as needed
];

// Predefined roles for multi-select dropdown
const ROLEOPTIONS: string[] = ['Admin', 'User', 'Moderator'];

interface User {
  id: number;
  name: string;
  surname: string;
  role: string;
  email: string;
  // Other properties as needed
}

interface TableColumn {
  field: keyof User;
  caption: string;
  allowSorting: boolean;
  filterValue?: string;
  width?: number;
}
