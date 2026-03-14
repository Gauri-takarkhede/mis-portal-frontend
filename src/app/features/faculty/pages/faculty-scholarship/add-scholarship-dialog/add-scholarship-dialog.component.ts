import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ScholarshipService } from '../../../services/scholarship.service';

@Component({
  selector: 'app-add-scholarship-dialog',
  templateUrl: './add-scholarship-dialog.component.html',
  styleUrls: ['./add-scholarship-dialog.component.scss'],
})
export class AddScholarshipDialogComponent {
  scholarshipForm: FormGroup;
  selectedFile!: File | null;

  constructor(
    private fb: FormBuilder,
    private scholarshipService: ScholarshipService,
    private dialog: MatDialogRef<AddScholarshipDialogComponent>,
  ) {
    this.scholarshipForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.maxLength(255)]],
      deadline: [''],
    });
  }

  onFileSelected(event: any, fileInput: HTMLInputElement) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > 1024 * 1024) {
      alert('File size should be less than 5MB');
      this.selectedFile = null;
      fileInput.value = '';
      return;
    }

    this.selectedFile = file;
  }

  submitScholarship() {
    if (this.selectedFile == null) {
      alert('File is required.');
      return;
    }

    const formData = new FormData();

    formData.append('title', this.scholarshipForm.value.title);
    formData.append('description', this.scholarshipForm.value.description);
    formData.append('deadline', this.scholarshipForm.value.deadline);
    formData.append('file', this.selectedFile);

    this.scholarshipService.uploadScholarship(formData).subscribe({
      next: (res) => {
        console.log('Uploaded successfully', res);
        this.dialog.close(false);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onClose() {
    this.dialog.close(false);
  }
}
