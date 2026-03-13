import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = `${environment.apiUrl}/api/auth`;
  accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  userRegister(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  userLogin(data: any) {
    return this.http.post(`${this.API}/login`, data, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.API}/logout`, {}, { withCredentials: true });
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  refreshToken() {
    return this.http.post(`${this.API}/refresh`, {}, { withCredentials: true });
  }

  isLoggedIn() {
    return !!this.accessToken;
  }

  getUser() {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded;
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.role;
  }

  getUserName(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.name;
  }

  getUserMis(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.mis;
  }
}
