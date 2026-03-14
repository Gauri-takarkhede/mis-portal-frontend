import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScholarshipDialogComponent } from './add-scholarship-dialog.component';

describe('AddScholarshipDialogComponent', () => {
  let component: AddScholarshipDialogComponent;
  let fixture: ComponentFixture<AddScholarshipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScholarshipDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScholarshipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
