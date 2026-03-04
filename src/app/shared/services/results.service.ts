import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ResultService {
  private base = `${environment.apiUrl}/api/results`;

  constructor(private http: HttpClient) {}

  addResult(data: any) {
    return this.http.post(`${this.base}/addResult`, data);
  }

  getStudentResults(mis: string) {
    return this.http.get(`${this.base}/${mis}`);
  }
}
