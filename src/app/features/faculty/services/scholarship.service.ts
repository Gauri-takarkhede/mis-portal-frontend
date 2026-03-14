import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScholarshipService {
  private baseUrl = `${environment.apiUrl}/api/scholarship`;

  constructor(private http: HttpClient) {}

  getAllScholarships() {
    return this.http.get(`${this.baseUrl}/`);
  }

  uploadScholarship(payload: FormData) {
    return this.http.post(`${this.baseUrl}/upload`, payload);
  }
}
