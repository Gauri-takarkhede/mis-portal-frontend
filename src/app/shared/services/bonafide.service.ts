import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BonafideService {
  private base = `${environment.apiUrl}/api/bonafide`;

  constructor(private http: HttpClient) {}

  createRequest(data: any) {
    return this.http.post(`${this.base}/`, data);
  }

  getMyRequests() {
    return this.http.get<any>(`${this.base}/`);
  }

  getAllRequests() {
    return this.http.get<any>(`${this.base}/all`);
  }

  approve(id: string) {
    return this.http.patch(`${this.base}/approve/${id}`, {});
  }

  reject(id: string) {
    return this.http.patch(`${this.base}/reject/${id}`, {});
  }

  downloadBonafide(id: String) {
    return this.http.get(`${this.base}/download/${id}`, {
      responseType: 'blob',
    });
  }
}
