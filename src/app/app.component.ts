import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  loading$ = this.loaderService.loading$;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
  ) {}

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
