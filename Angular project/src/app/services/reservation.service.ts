import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8093';

  getAllreservation(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getallreservations`);
  }
  getreservationbyid(id:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getreservation/${id}`);
  }
  addreservation(reservation:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addreservation`,reservation);
  }
  deletereservation(id:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletereservation/${id}`);
  }
  ChangeStatus(id:any,data:any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/updatestatus/${id}`,data);
  }

}
