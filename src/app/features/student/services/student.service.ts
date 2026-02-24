import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = `${environment.apiUrl}/api/students`;

  constructor(private http: HttpClient) {}

  // GET ALL STUDENTS
  getAllStudents() {
    const token = sessionStorage.getItem('token');

    return this.http.get<any>(`${this.baseUrl}/profiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllStudentsDetails() {
    const token = sessionStorage.getItem('token');

    return this.http.get<any>(`${this.baseUrl}/profilesDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getProfile(mis: any) {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/profile/${mis}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getProfileDetails(mis: any) {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/profileDetails/${mis}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getNonPublishedModules() {
    return this.http.get(`${this.baseUrl}/published`);
  }

  submitElectives(data: any) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/submitElectives`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addStudentDetails(mis: string, data: any) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/add-details/${mis}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
