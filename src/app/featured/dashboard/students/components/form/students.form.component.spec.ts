import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './students.form.component';
import { StudentsService } from '../../../../../core/services/students.service';
import { CoursesService } from '../../../../../core/services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONFIG, AppConfig } from '../../../../../core/injection-token/index';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let studentsServiceSpy: jasmine.SpyObj<StudentsService>;
  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  const appConfigMock: AppConfig = {
    API_URL: 'http://fakeapi.com',
    API_KEY: 'mock-key'
  };  

  beforeEach(async () => {
    studentsServiceSpy = jasmine.createSpyObj('StudentsService', ['addStudent']);
    coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['getCoursesTitles'], {
      coursesTitles$: of(['Angular', 'TypeScript', 'RxJS']),
    });
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormComponent],
      providers: [
        { provide: StudentsService, useValue: studentsServiceSpy },
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: APP_CONFIG, useValue: appConfigMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load courses titles', () => {
    expect(component.formGroup).toBeDefined();
    expect(component.coursesTitles.length).toBe(3);
    expect(coursesServiceSpy.getCoursesTitles).toHaveBeenCalled();
  });

  it('should emit studentSaved event on save() if form is valid', () => {
    spyOn(component.studentSaved, 'emit');

    component.formGroup.setValue({
      firstName: 'Denise',
      lastName: 'Perez',
      email: 'denise@example.com',
      course: 'Angular'
    });

    component.save();

    expect(component.studentSaved.emit).toHaveBeenCalledWith(component.formGroup.value);
  });

  it('should emit studentCancelled event on cancel()', () => {
    spyOn(component.studentCancelled, 'emit');
    component.cancel();
    expect(component.studentCancelled.emit).toHaveBeenCalled();
  });

  it('should call addStudent and reset form if dialog is confirmed on submit()', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);
    component.mode = 'create';

    component.formGroup.setValue({
      firstName: 'Denise',
      lastName: 'Perez',
      email: 'denise@example.com',
      course: 'Angular'
    });

    component.submit();

    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(studentsServiceSpy.addStudent).toHaveBeenCalledWith(component.formGroup.value);
    expect(component.formGroup.pristine).toBeTrue();
  });

  it('should not call addStudent if dialog is cancelled on submit()', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(false) });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);
    component.mode = 'create';

    component.submit();

    expect(studentsServiceSpy.addStudent).not.toHaveBeenCalled();
  });

  it('should not open dialog if mode is not "create" on submit()', () => {
    component.mode = 'edit';
    component.submit();
    expect(matDialogSpy.open).not.toHaveBeenCalled();
  });
});
