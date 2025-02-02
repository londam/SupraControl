import { Component } from '@angular/core';
import { SelectionChangedEvent } from 'devextreme/ui/accordion';
import { TableColumn, User } from '../models/types';

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

  selectedRoles: string[] = []; // Roles selected in the dropdown
  filteredUsers: User[] = [...this.users]; // Filtered user list based on role selection

  // Search bar in title
  isSearchVisible: boolean = false; // Track search input visibility
  searchQuery: string = ''; // Search query

  // Filtering functionality
  searchFilter: string = ''; // Filter value for real-time column search

  // Users selected by hand in the data grid
  selectedUsers: User[] = [];

  selectedUser: User | null = null;
  isModalVisible: boolean = false;

  // Show/hide the search input field
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.clearSearch(); // Clear search when hiding the input
    }
  }

  // Handle search change (filter users)
  onSearchChange(query: string) {
    this.searchQuery = query;
    this.filteredUsers = this.filterUsers(query);
  }

  // Filter users based on the search query (search across all properties)
  filterUsers(query: string): User[] {
    if (!query) return [...this.users]; // No search query, show all users
    return this.users.filter((user) =>
      Object.values(user).some(
        (value) => String(value).toLowerCase().includes(query.toLowerCase()) // Case-insensitive search
      )
    );
  }

  // Clear search
  clearSearch() {
    this.searchQuery = '';
    this.filteredUsers = [...this.users]; // Reset to all users
  }

  // Action Button Handlers
  onEditUser() {
    if (this.selectedUsers.length === 1) {
      this.selectedUser = { ...this.selectedUsers[0] }; // Pass user data to the modal for editing
      this.isModalVisible = true; // Show modal
    }
  }

  onDeleteUser() {
    const selectedUsers = this.selectedUsers;
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
    this.selectedUser = null; // Reset selected user for adding
    this.isModalVisible = true; // Show modal
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

  // Close the modal
  closeModal() {
    this.isModalVisible = false;
  }

  // Save the user after editing or adding
  saveUser(user: User) {
    let updatedUsers: User[];
    let updatedFilteredUsers: User[] = [...this.filteredUsers];

    if (user.id) {
      // Update user in the list (for editing)
      updatedUsers = this.users.map((u) =>
        u.id === user.id ? { ...user } : u
      );
      updatedFilteredUsers = this.users.map((u) =>
        u.id === user.id ? { ...user } : u
      );
    } else {
      // Add new user (for adding)
      user.id = this.users.length + 1;
      updatedUsers = [...this.users, user];
    }
    this.users = updatedUsers; // Assign the new array to trigger change detection
    this.filteredUsers = updatedFilteredUsers; // Assign the new array to trigger change detection
    console.log(this.users);
  }

  // Handle selection of users in the DataGrid
  onSelectionChanged(event: any) {
    this.selectedUsers = event.selectedRowsData;
    console.log('Selected Users:', this.selectedUsers);
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
    id: 3,
    name: 'Stim',
    surname: 'Jubilee',
    role: 'User',
    email: 'jane@example.com',
  },
  {
    id: 4,
    name: 'Robert',
    surname: 'Johnson',
    role: 'Moderator',
    email: 'robert@example.com',
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
