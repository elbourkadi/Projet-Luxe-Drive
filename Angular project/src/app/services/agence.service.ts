import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8093';

  getAllAgence(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getallagences`);
  }

  AddAgence(newAgence: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addagence`,newAgence);
  }
  getAgence(id:any) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getagence/${id}`);
  }
  updateAgence(id:any,updateagence:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateagence/${id}`,updateagence);
  }

  deleteAgence(id:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteagence/${id}`);
  }

   
}
