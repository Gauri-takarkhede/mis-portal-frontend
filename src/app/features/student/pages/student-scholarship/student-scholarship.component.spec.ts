import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentScholarshipComponent } from './student-scholarship.component';

describe('StudentScholarshipComponent', () => {
  let component: StudentScholarshipComponent;
  let fixture: ComponentFixture<StudentScholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentScholarshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentScholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
