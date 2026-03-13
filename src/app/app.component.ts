import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.refreshToken().subscribe({
      next: (response: any) => {
        this.authService.setAccessToken(response.accessToken);
      },
      error: () => {
        console.log('No active session');
      },
    });
  }
}
