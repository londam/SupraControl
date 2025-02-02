import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchUsersService {
  private apiUrl = 'https://dev.supracontrol.com:8080/api/User/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Token: token || '' });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
