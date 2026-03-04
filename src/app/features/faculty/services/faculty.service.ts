import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  private baseUrl = `${environment.apiUrl}/api/elective`;
  private facultyBaseUrl = `${environment.apiUrl}/api/faculty`;

  constructor(private http: HttpClient) {}

  getProfile(mis: any) {
    return this.http.get(`${this.facultyBaseUrl}/profile/${mis}`);
  }

  createElective(payload: any) {
    return this.http.post(this.baseUrl, payload);
  }

  // GET all electives
  getAllElectives() {
    return this.http.get(`${this.baseUrl}`);
  }

  // PUBLISH elective
  publishElective(id: string) {
    return this.http.put(`${this.baseUrl}/publish/${id}`, {});
  }

  allocate(moduleId: string) {
    return this.http.post(`${this.baseUrl}/allocate/${moduleId}`, {});
  }

  deleteElective(moduleId: string) {
    return this.http.delete(`${this.baseUrl}/delete/${moduleId}`);
  }

  getAllocations(moduleId: string) {
    return this.http.get(`${this.baseUrl}/allocations/${moduleId}`);
  }

  getAllPreferences() {
    return this.http.get(`${this.baseUrl}/getAllPreferences`);
  }

  getAllRequests() {
    return this.http.get(`${this.baseUrl}/bonafide/all`);
  }

  approve(id: string) {
    return this.http.patch(`${this.baseUrl}/bonafide/approve/${id}`, {});
  }

  reject(id: string) {
    return this.http.patch(`${this.baseUrl}/bonafide/reject/${id}`, {});
  }

  getAllStudents() {
    return this.http.get(`${this.facultyBaseUrl}/allStudents`);
  }

  addFacultyDetails(mis: string, data: any) {
    return this.http.post(`${this.facultyBaseUrl}/add-details/${mis}`, data);
  }
}
