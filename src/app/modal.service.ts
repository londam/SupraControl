import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  isModalVisible: boolean = false;
  selectedUser: any = null;

  openModal(user: any = null): void {
    this.selectedUser = user;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedUser = null;
  }
}
