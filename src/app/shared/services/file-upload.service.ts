import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private base = `${environment.apiUrl}/api/profile`;

  constructor(private http: HttpClient) {}

  uploadPhoto(data: any) {
    return this.http.put(`${this.base}/upload`, data);
  }

  removePhoto() {
    return this.http.put(`${this.base}/remove`, {});
  }
}
