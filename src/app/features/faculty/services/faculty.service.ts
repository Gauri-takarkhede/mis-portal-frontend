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
    const token = sessionStorage.getItem('token');
    return this.http.get(`${this.facultyBaseUrl}/profile/${mis}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createElective(payload: any) {
    const token = sessionStorage.getItem('token');
    return this.http.post(this.baseUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // GET all electives
  getAllElectives() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${this.baseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // PUBLISH elective
  publishElective(id: string) {
    return this.http.put(`${this.baseUrl}/publish/${id}`, {});
  }

  allocate(moduleId: string) {
    const token = sessionStorage.getItem('token');
    return this.http.post(
      `${this.baseUrl}/allocate/${moduleId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  deleteElective(moduleId: string) {
    const token = sessionStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/delete/${moduleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = sessionStorage.getItem('token');

    return this.http.post(`${this.facultyBaseUrl}/add-details/${mis}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
