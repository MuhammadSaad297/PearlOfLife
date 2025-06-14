import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensures the service is available globally
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Replace with your API URL
  private auth = '/auth';

  constructor(private http: HttpClient) {}

  // Method to call the login API
  login(credentials: {
    email: string;
    hashed_password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.auth}/login`, credentials, {
      observe: 'response',
    });
  }

  // Method to call the login API
  register(register: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.auth}/register`, register);
  }

  getKeyHolder(tokenURL: string) {
    return this.http.get(`${this.baseUrl}${this.auth}/keyholder/${tokenURL}`);
  }

  loginKeyHolder(reqObj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.auth}/keyholder`, reqObj, {
      observe: 'response',
    });
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}${this.auth}/forgot-password`, {
      email,
    });
  }
}
