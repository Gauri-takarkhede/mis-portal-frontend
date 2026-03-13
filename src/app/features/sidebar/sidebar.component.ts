import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public userRole: String | null = '';
  profileImage: SafeUrl | null = '';
  public studentName: String | null = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.studentName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
    const image = sessionStorage.getItem('profileImage')
      ? sessionStorage.getItem('profileImage')
      : '';
    if (image) {
      this.profileImage = this.sanitizer.bypassSecurityTrustUrl(
        JSON.parse(image),
      );
    }
  }
  signOut(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.setAccessToken(null);
        this.router.navigate(['/']);
      },
    });
  }
}
