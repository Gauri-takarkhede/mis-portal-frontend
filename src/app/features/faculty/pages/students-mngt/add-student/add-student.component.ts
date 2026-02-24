import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentService } from 'src/app/features/student/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { FacultyService } from '../../../services/faculty.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  @Output() goToAllStudentsStep = new EventEmitter<void>();
  student: any = null;
  loading = false;
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
  departments = [
    { label: 'Computer', value: 'COMPUTER' },
    { label: 'Electronics', value: 'ELECTRONICS' },
    { label: 'Electrical', value: 'ELECTRICAL' },
    { label: 'Mechanical', value: 'MECHANICAL' },
    { label: 'Civil', value: 'CIVIL' },
  ];
  genders = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
  ];
  maxDate = new Date();
  personalDetailsFormGroup: FormGroup;
  academicsFormGroup: FormGroup;
  studentFormGroup: FormGroup;
  showDeatailsTab: boolean = false;
  mis: string = '';

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.studentFormGroup = this.fb.group({
      name: ['', Validators.required],
      mis: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.personalDetailsFormGroup = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      category: ['', Validators.required],
      religion: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });

    this.academicsFormGroup = this.fb.group({
      course: ['', Validators.required],
      dateOfAdmission: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.studentFormGroup.invalid) {
      this.showError('Invalid Inputs');
      return;
    }

    const { name, email, mis, password, department, phone } =
      this.studentFormGroup.value;
    const username = name;
    const role = 'STUDENT';
    const dept = department.toUpperCase();
    this.mis = mis;

    const payload = {
      username,
      email,
      mis,
      password,
      department: dept,
      role,
      phone,
    };

    this.auth.userRegister(payload).subscribe({
      next: (res) => {
        this.showSuccess('Registered successfully!');
        this.showDeatailsTab = true;
      },
      error: (err) => {
        this.showError('Registration failed!');
      },
    });
  }

  submitDeatils(): void {
    if (
      this.personalDetailsFormGroup.invalid ||
      this.academicsFormGroup.invalid
    ) {
      this.showError('Invalid Inputs');
      return;
    }
    const finalData = {
      ...this.personalDetailsFormGroup.value,
      ...this.academicsFormGroup.value,
      dateOfBirth: this.formatDate(
        this.personalDetailsFormGroup.value.dateOfBirth,
      ),
      dateOfAdmission: this.formatDate(
        this.academicsFormGroup.value.dateOfAdmission,
      ),
    };
    this.studentService.addStudentDetails(this.mis, finalData).subscribe({
      next: (res) => {
        this.showSuccess('Student details saved successfully!');

        this.resetForm(this.studentFormGroup);
        this.resetForm(this.personalDetailsFormGroup);
        this.resetForm(this.academicsFormGroup);
        this.showDeatailsTab = false;
        this.goToAllStudentsStep.emit();
      },
      error: (err) => {
        this.showError('Something went wrong!');
      },
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
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

  resetForm(form: FormGroup) {
    form.reset();
    form.markAsPristine();
    form.markAsUntouched();
  }
}
