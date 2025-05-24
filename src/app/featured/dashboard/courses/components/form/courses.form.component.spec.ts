import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './courses.form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CoursesService } from '@core/services/courses.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['addCourse']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule, NoopAnimationsModule],
      declarations: [FormComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: CoursesService, useValue: coursesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    // For tests, no @Input() course by default
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when no course input', () => {
    expect(component.formGroup.value).toEqual({
      id: '',
      title: '',
      description: ''
    });
  });

  it('should emit courseSaved on save() if form is valid', () => {
    spyOn(component.courseSaved, 'emit');
    component.formGroup.setValue({
      id: '123',
      title: 'Curso de prueba',
      description: 'Descripción válida para el curso'
    });

    component.save();

    expect(component.courseSaved.emit).toHaveBeenCalledWith(component.formGroup.value);
  });

  it('should not emit courseSaved if form is invalid', () => {
    spyOn(component.courseSaved, 'emit');
    component.formGroup.setValue({
      id: '',
      title: '',        // invalid: required and minlength
      description: ''
    });

    component.save();

    expect(component.courseSaved.emit).not.toHaveBeenCalled();
  });

  it('should emit courseCancelled when cancel() is called', () => {
    spyOn(component.courseCancelled, 'emit');
    component.cancel();
    expect(component.courseCancelled.emit).toHaveBeenCalled();
  });

  it('should call addCourse and reset form after submit and dialog confirmation', () => {
    component.mode = 'create';

    const afterClosedSpy = jasmine.createSpyObj({ subscribe: of(true).subscribe.bind(of(true)) });
    matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

    component.formGroup.setValue({
      id: '',
      title: 'Nuevo curso',
      description: 'Descripción válida para un nuevo curso'
    });

    component.submit();

    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(coursesServiceSpy.addCourse).toHaveBeenCalled();
    expect(component.formGroup.value.title).toBe('');  // tras reset, debería estar vacío
  });

  it('should not do anything on submit if mode is not create', () => {
    component.mode = 'edit';
    component.submit();
    expect(matDialogSpy.open).not.toHaveBeenCalled();
  });
});
