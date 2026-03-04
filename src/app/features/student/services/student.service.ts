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
    return this.http.get<any>(`${this.baseUrl}/profiles`);
  }

  getAllStudentsDetails() {
    return this.http.get<any>(`${this.baseUrl}/profilesDetails`);
  }

  getProfile(mis: any) {
    return this.http.get(`${this.baseUrl}/profile/${mis}`);
  }

  getProfileDetails(mis: any) {
    return this.http.get(`${this.baseUrl}/profileDetails/${mis}`);
  }

  getNonPublishedModules() {
    return this.http.get(`${this.baseUrl}/published`);
  }

  submitElectives(data: any) {
    return this.http.post(`${this.baseUrl}/submitElectives`, data);
  }

  addStudentDetails(mis: string, data: any) {
    return this.http.post(`${this.baseUrl}/add-details/${mis}`, data);
  }
}
