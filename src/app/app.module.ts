import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxTagBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UsersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxTextBoxModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
