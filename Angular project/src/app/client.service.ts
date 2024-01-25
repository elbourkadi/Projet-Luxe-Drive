import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://jsonplaceholder.typicode.com'; 

  constructor(private http: HttpClient) { }

  getSomeData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }
}
