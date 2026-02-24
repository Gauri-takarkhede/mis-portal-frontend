import { Component, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FacultyService } from '../../services/faculty.service';
import { AuthService } from 'src/app/core/auth.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-faculty-dashboard',
  templateUrl: './faculty-dashboard.component.html',
  styleUrls: ['./faculty-dashboard.component.scss'],
})
export class FacultyDashboardComponent {
  mis: string = '';
  student: any;
  facultyDetails: any = null;
  loading = true;
  selectedFile!: File;
  imagePreview: string | null = null;
  userId = 'USER_ID_HERE';
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
  facultyFormGroup: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private facultyService: FacultyService,
    private snackBar: MatSnackBar,
  ) {
    this.facultyFormGroup = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      category: ['', Validators.required],
      religion: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      course: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      specialization: ['', Validators.required],
      designation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFaculty();
  }

  loadFaculty() {
    const user = this.auth.getUser();
    const mis = user.mis;
    this.mis = mis;
    this.facultyService.getProfile(mis).subscribe({
      next: (res: any) => {
        console.log(res);
        this.student = res;
        this.facultyDetails = res.facultyDetails;
        this.imagePreview = res.profileImage;
        sessionStorage.setItem(
          'profileImage',
          JSON.stringify(this.imagePreview ? this.imagePreview : ''),
        );
        this.loading = false;
        if (this.facultyDetails) {
          const formattedJoiningDate = this.facultyDetails.dateOfJoining
            ? new Date(this.facultyDetails.dateOfJoining)
                .toISOString()
                .split('T')[0]
            : '';
          const formattedBirthDate = this.facultyDetails.dateOfBirth
            ? new Date(this.facultyDetails.dateOfBirth)
                .toISOString()
                .split('T')[0]
            : '';
          const mappedData = {
            address: this.facultyDetails.address,
            city: this.facultyDetails.city,
            state: this.facultyDetails.state,
            bloodGroup: this.facultyDetails.bloodGroup,
            category: this.facultyDetails.category,
            religion: this.facultyDetails.religion,
            gender: this.facultyDetails.gender,
            dateOfBirth: formattedBirthDate,
            course: this.facultyDetails.course,
            dateOfJoining: formattedJoiningDate,
            specialization: this.facultyDetails.specialization,
            designation: this.facultyDetails.designation,
          };

          this.facultyFormGroup.patchValue(mappedData);
        }

        // // Disable entire form
        // this.facultyFormGroup.disable();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPG or PNG allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Max size 2MB');
      return;
    }

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  uploadPhoto() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('photo', this.selectedFile);

    this.fileUploadService.uploadPhoto(formData).subscribe((res: any) => {
      this.imagePreview = res.profileImage;
      alert('Uploaded successfully');
    });
  }

  removePhoto() {
    this.fileUploadService.removePhoto().subscribe(() => {
      this.imagePreview = null;
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
        sessionStorage.removeItem('profileImage');
      }
      alert('Photo removed');
    });
  }

  submitDeatils(): void {
    if (this.facultyFormGroup.invalid) {
      this.showError('Invalid Inputs');
      return;
    }
    const finalData = {
      mis: this.mis,
      ...this.facultyFormGroup.value,
    };
    this.facultyService.addFacultyDetails(this.mis, finalData).subscribe({
      next: (res) => {
        this.showSuccess('Faculty details saved successfully!');
      },
      error: (err) => {
        this.showError('Something went wrong!');
      },
    });
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
