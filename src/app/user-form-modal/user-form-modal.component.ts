import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/types'; // Import User type

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss'],
})
export class UserFormModalComponent {
  @Input() user: User | null = null; // To accept user for editing (null for Add)
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() saveUser: EventEmitter<User> = new EventEmitter();

  userForm: User = {
    id: 0,
    name: '',
    surname: '',
    role: '',
    email: '',
  }; // Default form values

  ngOnChanges() {
    if (this.user) {
      this.userForm = { ...this.user }; // If editing, populate with existing user data
    }
  }

  close() {
    this.closeModal.emit();
  }

  save() {
    this.saveUser.emit(this.userForm);
    this.close(); // Close the modal after saving
  }
}
