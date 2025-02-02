import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user'; // Import User type
import { ROLEOPTIONS } from '../models/role';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss'],
})
export class UserFormModalComponent {
  @Input() user: User | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() saveUser: EventEmitter<User> = new EventEmitter();

  userForm: User = {
    Id: 0,
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    RoleNames: [],
  }; // Default form values

  RoleAdmin = false;
  RoleUser = false;

  GenderOptions: string[] = ['M', 'Ž'];
  WorkPlaceOptions: string[] = ['Zagreb', 'Osijek', 'Varaždin'];
  CountryOptions: string[] = ['HR', 'SI', 'AT', 'HU'];
  CityOptions: string[] = ['Zagreb', 'Osijek', 'Varaždin', 'Split'];

  showPassword = false;
  showConfirmPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnChanges() {
    if (this.user) {
      this.userForm = { ...this.user }; // If editing, populate with existing user data
    }
  }

  close() {
    this.closeModal.emit();
  }

  save() {
    if (this.RoleAdmin) this.userForm.RoleNames?.push('Administrator');
    if (this.RoleUser) this.userForm.RoleNames?.push('User');
    this.saveUser.emit(this.userForm);
    this.close(); // Close the modal after saving
  }
}
