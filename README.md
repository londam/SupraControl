# Angular User Management Application

This project is an Angular-based user management application that utilizes DevExtreme components for a modern UI. The application allows users to view, edit, delete, and add new users. It also supports filtering users by roles, searching through user properties, and selecting multiple roles via checkboxes.

## Features

- **User List Display**: A table with users, showing their basic details such as name, surname, role, and email.
- **Role-based Filtering**: Multi-select dropdown for filtering users by roles.
- **Search Functionality**: Real-time search across all user properties.
- **Add/Edit User**: Modal form to add new users or edit existing ones.
- **Delete User**: Option to delete selected users with a confirmation prompt.
- **User Selection**: Checkboxes for selecting individual users in the data grid.

## Technologies Used

- **Angular**: Framework for building the application.
- **DevExtreme**: UI components (Data Grid, SelectBox, CheckBox, etc.).
- **TypeScript**: Strongly-typed superset of JavaScript.
- **Tailwind**: Markup and styling of the application.
- **HTML/CSS**: Markup and styling of the application.

## Installation

### Prerequisites

- Node.js (preferably the latest stable version)
- npm (Node Package Manager)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/londam/SupraControl
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

 3. Run the development server:
    ```bash
    ng serve --open
    ```

    The application will be available at [http://localhost:4200](http://localhost:4200).

## Usage

### Login /login
App immeidately forwards you to /login from homepage. Also if you try to go to /users you will be forwarded to /login due to Auth Guard that's protecting this URL. Auth is made via Basic Auth.
After successful login, you're forwared to /users page.

### User Table /users

The user table fetches list of users from the server and displays it in the table with the columns as requested by the project brief: checkbox, ime, prezime, email, telefon, role, radno mjest, država, grad.

### Role Filtering

At the top of the page, there is a multi-select dropdown that allows you to filter users by their roles. Select one or more roles, and the table will update in real time to show only users that match the selected roles.

### Search Functionality

A search bar allows you to filter users based on any of the properties (e.g., name, surname, role). As you type in the search box and press enter, the table is filtered to show users whose details match the search query.

### Adding and Editing Users

To add a new user or edit an existing one, click the **Add New User** or **Edit** button. A modal window will appear with a form to input the user's details as per project brief:
- Ime, Prezime, Spol, Radno mjesto, Bilješke, Email, Telefon, Država, Grad, Adresa, Korisničko ime, choice of two required roles, and standard two fields for password change.

Once the form is filled, click **Save** to update the user list.

### Deleting Users

Select one or more user(s) either via checkboxes on the left or via mouse clicking (shit or ctrl assisted) that you want, then click the **Delete** button. A confirmation dialog will appear, and upon confirmation, the selected user(s) will be removed from the list.

## Folder Structure
src/ 

├── app/ # Contains services for data fetching, etc. (if any) 

│ ├── login/ # Contains the login component

│ ├── user-form-model/ # Contains the modal form component for editing or adding new users

│ ├── users/ # Contains the main component responsible for showing the users data and operating on them 

│ ├── models/ # Defines TypeScript interfaces/types and some collections (User, TableColumn, etc.) 

│ ├── app.component.ts # Main component file 

│ ├── app.module.ts # Angular module file for imports and declarations 

└── assets/ # Static assets (images, styles, etc.) 

└── environments/ # Configuration for different environments (e.g., dev, prod)

## DevExtreme UI Components

This application uses the following **DevExtreme** components:
- `DxDataGridModule`: For displaying the list of users.
- `DxCheckBoxModule`: For multi-select role filtering.
- `DxSelectBoxModule`: For selecting a single user role.
- `DxButtonModule`: Various usage.
- `DxTextBoxModule`: Various usage.
- `DxTagBoxModule`: For selecting user roles for filtering.
- `DxTextAreaModule`: For inputs in modal form 

## Stuff to do moving forward
- due to lack of time there are some stuff that are still left to do:
- - code & comment cleanup
  - reorganizing files by putting services as well as components into subfolders of /app
  - do thorough testing
  - implementing functionality to save the changes to server
  - some minor visual CSS problems

