import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { BonafideService } from 'src/app/shared/services/bonafide.service';

@Component({
  selector: 'app-student-bonafide',
  templateUrl: './student-bonafide.component.html',
  styleUrls: ['./student-bonafide.component.scss'],
})
export class StudentBonafideComponent implements OnInit {
  loading = false;
  message = '';
  requests: any[] = [];

  form = this.fb.group({
    reason: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private bonafideService: BonafideService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getMyRequestsList();
  }

  getMyRequestsList() {
    this.bonafideService.getMyRequests().subscribe({
      next: (res) => {
        this.requests = res;
        this.loading = false;
      },
      error: (error) => {
        this.message = 'Error submitting request';
        this.loading = false;
        console.log(error);
      },
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    this.bonafideService.createRequest(this.form.value).subscribe({
      next: () => {
        this.message = 'Bonafide request submitted';
        this.loading = false;
        this.form.reset();
        this.getMyRequestsList();
      },
      error: (error) => {
        this.message = 'Error submitting request';
        this.loading = false;
        console.log(error);
      },
    });
  }

  download(id: string) {
    this.bonafideService.downloadBonafide(id).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'bonafide_certificate.pdf';
        a.click();

        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Download failed', error);
      },
    );
  }
}
