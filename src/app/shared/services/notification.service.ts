import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private client!: Client;

  private notificationsSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Load existing latest 10 notifications from DB
  loadLatestNotifications() {
    this.http
      .get<any[]>(`${environment.apiUrl}/api/notifications/latest`)
      .subscribe((data) => {
        this.notificationsSubject.next(data);
      });
  }

  loadNotifications() {
    return this.http.get<any[]>(`${environment.apiUrl}/api/notifications`);
  }

  connect() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${environment.apiUrl}/api/ws`),
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      console.log('WebSocket Connected');

      this.client.subscribe('/topic/notifications', (message) => {
        const notification = JSON.parse(message.body);

        const current = this.notificationsSubject.value;

        // add newest notification at top
        this.notificationsSubject.next([notification, ...current].slice(0, 10));
      });
    };

    this.client.activate();
  }
}
