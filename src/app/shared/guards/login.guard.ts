import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  canActivate(): boolean {
    const token = this.authService.getAccessToken();

    if (token) {
      // User already logged in → redirect to home
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
