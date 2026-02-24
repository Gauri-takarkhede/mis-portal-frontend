import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacultyService } from '../../../services/faculty.service';
import { StudentService } from 'src/app/features/student/services/student.service';

@Component({
  selector: 'app-add-details-modal',
  templateUrl: './add-details-modal.component.html',
  styleUrls: ['./add-details-modal.component.scss'],
})
export class AddDetailsModalComponent implements OnInit {
  personalDetailsFormGroup: FormGroup;
  public studentDetails: any;
  bloodGroups = [
    { label: 'A+', value: 'A_POSITIVE' },
    { label: 'A-', value: 'A_NEGATIVE' },
    { label: 'B+', value: 'B_POSITIVE' },
    { label: 'B-', value: 'B_NEGATIVE' },
    { label: 'AB+', value: 'AB_POSITIVE' },
    { label: 'AB-', value: 'AB_NEGATIVE' },
    { label: 'O+', value: 'O_POSITIVE' },
    { label: 'O-', value: 'O_NEGATIVE' },
  ];
  categories = [
    { label: 'General', value: 'GENERAL' },
    { label: 'OBC', value: 'OBC' },
    { label: 'SC', value: 'SC' },
    { label: 'ST', value: 'ST' },
    { label: 'EWS', value: 'EWS' },
  ];
  religions = [
    { label: 'Hindu', value: 'HINDU' },
    { label: 'Muslim', value: 'MUSLIM' },
    { label: 'Christian', value: 'CHRISTIAN' },
    { label: 'Sikh', value: 'SIKH' },
    { label: 'Buddhist', value: 'BUDDHIST' },
    { label: 'Jain', value: 'JAIN' },
    { label: 'Parsi', value: 'PARSI' },
    { label: 'Other', value: 'OTHER' },
  ];
  courses = [
    { label: 'B.Tech', value: 'BTECH' },
    { label: 'M.Tech', value: 'MTECH' },
  ];

  genders = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
  ];
  maxDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<AddDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public student: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private studentService: StudentService,
  ) {
    console.log(student, 'student in modal');
    this.studentDetails = student.studentDetails;
    this.personalDetailsFormGroup = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      category: ['', Validators.required],
      religion: ['', Validators.required],
      course: ['', Validators.required],
      dateOfAdmission: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.studentDetails) {
      const formattedAdmissionDate = this.studentDetails.dateOfAdmission
        ? new Date(this.studentDetails.dateOfAdmission)
            .toISOString()
            .split('T')[0]
        : '';
      const formattedBirthDate = this.studentDetails.dateOfBirth
        ? new Date(this.studentDetails.dateOfBirth).toISOString().split('T')[0]
        : '';
      const mappedData = {
        address: this.studentDetails.address,
        city: this.studentDetails.city,
        state: this.studentDetails.state,
        bloodGroup: this.studentDetails.bloodGroup,
        category: this.studentDetails.category,
        religion: this.studentDetails.religion,
        gender: this.studentDetails.gender,
        dateOfBirth: formattedBirthDate,
        course: this.studentDetails.course,
        dateOfAdmission: formattedAdmissionDate,
        specialization: this.studentDetails.specialization,
        designation: this.studentDetails.designation,
      };

      this.personalDetailsFormGroup.patchValue(mappedData);
    }
  }

  onClose() {
    this.dialogRef.close(false);
  }

  // onConfirm() {}
  submitDeatils(): void {
    if (this.personalDetailsFormGroup.invalid) {
      this.showError('Invalid Inputs');
      return;
    }
    const payload = {
      ...this.personalDetailsFormGroup.value,
      dateOfBirth: this.formatDate(
        this.personalDetailsFormGroup.value.dateOfBirth,
      ),
      dateOfAdmission: this.formatDate(
        this.personalDetailsFormGroup.value.dateOfAdmission,
      ),
    };

    this.studentService.addStudentDetails(this.student.mis, payload).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
        this.showSuccess('Student details saved successfully!');
      },
      error: (err) => {
        this.showError('Something went wrong!');
      },
    });
  }

  formatDate(date: any): string {
    if (!date) return '';

    if (typeof date === 'string') {
      return date;
    }

    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }

    return '';
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
