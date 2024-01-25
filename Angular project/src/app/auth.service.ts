import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userRole: string = 'user'; 
  private currentUser: any;
  helper = new JwtHelperService();

  isAdmin(): boolean {
    const token = localStorage.getItem('token'); 
    if(!token){
      return false;
    }
    const decodetoken= this.helper.decodeToken(token);
    if(decodetoken.role="admin"){
      return true;
    }

    if(this.helper.isTokenExpired(token)){
      return false;
    }

    return false;
    
  }

  isManager(): boolean {
    const token = localStorage.getItem('token'); 
    if(!token){
      return false;
    }
    const decodetoken= this.helper.decodeToken(token);
    if(decodetoken.role="manager"){
      return true;
    }
    if(this.helper.isTokenExpired(token)){
      return false;
    }
    return false;
  }

  private apiUrl = 'http://localhost:8093/api';
  private authToken: string | null = null;

  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  getDataById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/getuser/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/getallusers`);
  }
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/auth/updateuser/${id}`, userData);
  }
  
  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/auth/deleteuser/${id}`);
  }



  
  constructor(private http: HttpClient) { }


  registerUser(userData: any): Observable<any> {
    if (!this.authToken) {
      // Handle error or redirect to login
      // Example: throw new Error('Token not available');
      console.log("noooo")
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/auth/signup`,userData, { headers });
  }
   
  

  authenticateUser(credentials: any): Observable<any> {
    if (!this.authToken) {
      // Handle error or redirect to login
      // Example: throw new Error('Token not available');
      console.log("noooo")
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/auth/signin`, credentials ,{ headers });
  }

  getId(){
    const token = localStorage.getItem('token'); 
    if(!token){
      return false;
    }
    const decodetoken= this.helper.decodeToken(token);
    const ID=decodetoken.id;
    return ID;

  }
  getuserbyId(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`
    });
   const id=this.getId()

   if (id) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.apiUrl}/auth/getuser/${id}`, { headers })
        .subscribe(
          (data) => {
            resolve(data); // Resolve the Promise with the retrieved data
          },
          (error) => {
            console.error('Error occurred:', error);
            reject(error); // Reject the Promise if an error occurs
          }
        );
    });
  } else {
    return Promise.resolve(null); // Return a resolved Promise if ID is not available
  }

  }

}
