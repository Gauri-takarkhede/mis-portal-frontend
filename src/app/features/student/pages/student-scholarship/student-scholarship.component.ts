import { Component } from '@angular/core';
import { ScholarshipService } from 'src/app/features/faculty/services/scholarship.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-scholarship',
  templateUrl: './student-scholarship.component.html',
  styleUrls: ['./student-scholarship.component.scss'],
})
export class StudentScholarshipComponent {
  constructor(
    private scholarshipService: ScholarshipService,
    private sanitizer: DomSanitizer,
  ) {}

  public scholarships: any;
  previewUrl!: SafeResourceUrl;

  ngOnInit(): void {
    this.loadScholarships();
  }

  private loadScholarships() {
    this.scholarshipService.getAllScholarships().subscribe({
      next: (res: any) => {
        this.scholarships = res;
      },
      error: () => {
        alert('Something went wrong');
      },
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  previewPdf(url: string) {
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getGoogleViewerUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://docs.google.com/gview?embedded=true&url=' + url,
    );
  }

  download(url: string) {
    window.open(url, '_blank');
  }
}
