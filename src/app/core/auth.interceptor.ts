import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    if (req.url.includes('/auth')) {
      authReq = req.clone({
        withCredentials: true,
      });
      return next.handle(authReq);
    }

    const token = this.authService.getAccessToken();

    if (token) {
      authReq = req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              this.authService.setAccessToken(response.accessToken);

              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`,
                },
              });

              return next.handle(newReq);
            }),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
