import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  loginForm: FormGroup;
  loading = false;
  errorMsg: string = '';
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
  ) {
    this.loginForm = this.fb.group({
      mis: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      //  this.sharedService.showError()
      return;
    }

    this.loading = true;
    let { mis, password } = this.loginForm.value;
    mis = Number(mis);

    this.authService.userLogin({ mis, password }).subscribe({
      next: (res: any) => {
        this.loading = false;

        sessionStorage.setItem('token', res.token);

        // Redirect to student dashboard
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error || 'Invalid MIS or Password';
        this.sharedService.showError(this.errorMsg);
      },
    });
  }
}
