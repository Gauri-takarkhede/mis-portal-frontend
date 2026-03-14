import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyScholarshipComponent } from './faculty-scholarship.component';

describe('FacultyScholarshipComponent', () => {
  let component: FacultyScholarshipComponent;
  let fixture: ComponentFixture<FacultyScholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyScholarshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyScholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
