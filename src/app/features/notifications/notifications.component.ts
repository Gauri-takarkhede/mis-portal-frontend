import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.notificationService.loadNotifications().subscribe((data: any) => {
      this.notifications = data;
    });
  }
}
