import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDialogComponent } from './course-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../interfaces/courses';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CourseDialogComponent', () => {
  let component: CourseDialogComponent;
  let fixture: ComponentFixture<CourseDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CourseDialogComponent>>;

  const mockCourse: Course = {
    id: '1',
    title: 'Test Course',
    description: 'Test description'
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      declarations: [CourseDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockCourse },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with injected data', () => {
    const formValue = component.formGroup.value;
    expect(formValue.id).toEqual(mockCourse.id);
    expect(formValue.title).toEqual(mockCourse.title);
    expect(formValue.description).toEqual(mockCourse.description);
  });

  it('should mark form as invalid if required fields are empty', () => {
    component.formGroup.controls['title'].setValue('');
    component.formGroup.controls['description'].setValue('');
    expect(component.formGroup.valid).toBeFalse();
  });

  it('should close dialog with form value when confirm() is called and form is valid', () => {
    component.confirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.formGroup.value);
  });

  it('should not close dialog when confirm() is called and form is invalid', () => {
    component.formGroup.controls['title'].setValue('');
    component.formGroup.controls['description'].setValue('');
    component.confirm();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should close dialog without data when cancel() is called', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });
});
