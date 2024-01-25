import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {
  private apiUrl = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  getchart():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/chart?param={"type": "bar"}`);
  }
  getuser_count():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/user_count`);
  }
  getrevenue():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/revenue`);
  }
  getreservations_count():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/reservations_count`);
  }
}
