import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DxButtonModule, DxTextBoxModule } from 'devextreme-angular';
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
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
