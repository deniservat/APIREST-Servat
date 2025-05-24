import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentDialogComponent } from './student-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CoursesService } from '@core/services/courses.service';
import { Course } from 'app/featured/dashboard/courses/interfaces/courses'; // Asegurate de importar bien tu interfaz
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StudentDialogComponent', () => {
  let component: StudentDialogComponent;
  let fixture: ComponentFixture<StudentDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<StudentDialogComponent>>;
  let coursesServiceMock: Partial<CoursesService>;

  const studentMock = {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@example.com',
    course: 'Angular'
  };

  const mockCourses: Course[] = [
    { id: '1', title: 'Angular', description: 'Curso de Angular' },
    { id: '2', title: 'React', description: 'Curso de React' }
  ];

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    coursesServiceMock = {
      courses$: of(mockCourses)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [StudentDialogComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: studentMock },
        { provide: CoursesService, useValue: coursesServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora errores por componentes que no estás testeando (ej: Angular Material)
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with student data', () => {
    const formValues = component.formGroup.value;
    expect(formValues.firstName).toBe('Juan');
    expect(formValues.lastName).toBe('Pérez');
    expect(formValues.email).toBe('juan@example.com');
    expect(formValues.course).toBe('Angular');
  });

  it('should load courses from service', () => {
    expect(component.coursesTitles).toEqual(['Angular', 'React']);
  });

  it('should call dialogRef.close with form value when confirm is called and form is valid', () => {
    component.confirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.formGroup.value);
  });

  it('should not call dialogRef.close with data if form is invalid', () => {
    component.formGroup.controls['email'].setValue('invalid-email');
    component.confirm();
    expect(dialogRefSpy.close).not.toHaveBeenCalledWith(component.formGroup.value);
  });

  it('should close dialog without data on cancel', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });
});
