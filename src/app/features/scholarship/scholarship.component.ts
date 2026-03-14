import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { FacultyModule } from '../faculty/faculty.module';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.scss'],
})
export class ScholarshipComponent {
  public userRole: String | null = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();
  }
}
