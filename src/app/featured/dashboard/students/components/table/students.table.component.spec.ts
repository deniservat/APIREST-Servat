import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './students.table.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { StudentsService } from '../../../../../core/services/students.service';
import { Student } from '../../interfaces/student';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let studentsServiceMock: jasmine.SpyObj<StudentsService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  const mockStudents: Student[] = [
    { firstName: 'Ana', lastName: 'García', email: 'ana@example.com', course: 'angular' },
    { firstName: 'Luis', lastName: 'Martínez', email: 'luis@example.com', course: 'react' }
  ];

  beforeEach(async () => {
    studentsServiceMock = jasmine.createSpyObj('StudentsService', ['getStudentsObs', 'getStudentsPromise', 'editStudent', 'deleteStudent'], {
      students$: of(mockStudents)
    });

    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        { provide: StudentsService, useValue: studentsServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: 'TITLE', useValue: 'Estudiantes' }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Evita errores por componentes hijos no declarados
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on init', () => {
    expect(component.dataStudents.length).toBe(2);
    expect(component.dataStudents[0].firstName).toBe('Ana');
  });

  it('should open dialog and call editStudent if result is returned', () => {
    const studentToEdit = mockStudents[0];
    const updatedStudent: Student = { ...studentToEdit, firstName: 'Ana María' };

    // Mock del dialog
    dialogMock.open.and.returnValue({
      afterClosed: () => of(updatedStudent)
    } as any);

    component.openEditDialog(studentToEdit);

    expect(dialogMock.open).toHaveBeenCalled();
    expect(studentsServiceMock.editStudent).toHaveBeenCalledWith(studentToEdit.email, updatedStudent);
  });

  it('should NOT call editStudent if dialog returns undefined', () => {
    dialogMock.open.and.returnValue({
      afterClosed: () => of(undefined)
    } as any);

    component.openEditDialog(mockStudents[0]);

    expect(studentsServiceMock.editStudent).not.toHaveBeenCalled();
  });

  it('should call deleteStudent with email', () => {
    const email = 'ana@example.com';
    component.deleteStudent(email);
    expect(studentsServiceMock.deleteStudent).toHaveBeenCalledWith(email);
  });
});
