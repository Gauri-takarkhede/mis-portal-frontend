import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddScholarshipDialogComponent } from './add-scholarship-dialog/add-scholarship-dialog.component';
import { ScholarshipService } from '../../services/scholarship.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-faculty-scholarship',
  templateUrl: './faculty-scholarship.component.html',
  styleUrls: ['./faculty-scholarship.component.scss'],
})
export class FacultyScholarshipComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
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

  openDialog() {
    const dialogRef = this.dialog.open(AddScholarshipDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.loadScholarships();
    });
  }

  download(url: string) {
    window.open(url, '_blank');
  }
}
