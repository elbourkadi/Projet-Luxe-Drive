import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8093';

  getReservationsClient(id:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getreservationsbyuser/${id}`);
  }
}
