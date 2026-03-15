import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  notifications: any[] = [];
  badgeCount = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Load previous notifications from DB
    this.notificationService.loadLatestNotifications();

    this.notificationService.connect();

    this.notificationService.notifications$.subscribe((data) => {
      this.notifications = data;
      this.badgeCount = data.length;
    });
  }

  toggleDrawer(drawer: any) {
    drawer.toggle();
  }
}
