import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './courses.table.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Course } from '../../interfaces/courses';
import { CoursesActions } from '../../store/courses.actions';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  const dummyCourses: Course[] = [
    { id: '1', title: 'Angular', description: 'Intro to Angular' },
    { id: '2', title: 'TypeScript', description: 'Deep dive into TypeScript' }
  ];

  const initialState = {
    courses: {
      courses: dummyCourses,
      isLoading: false,
      error: null
    }
  };

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCourses on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(CoursesActions.loadCourses());
  });

  it('should open edit dialog and dispatch editCourse when result has id', () => {
    const editedCourse: Course = { id: '1', title: 'Angular Pro', description: 'Actualizado' };
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(editedCourse));
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openEditDialog(dummyCourses[0]);

    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      CoursesActions.editCourse({ id: editedCourse.id, course: editedCourse })
    );
  });

  it('should open dialog and dispatch addCourse when result has no id', () => {
    const newCourse = { title: 'Nuevo curso', description: 'Nuevo' };
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(newCourse));
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openEditDialog({ id: '', title: '', description: '' });

    expect(dispatchSpy).toHaveBeenCalledWith(
      CoursesActions.addCourse({ course: newCourse as Course })
    );
  });

  it('should dispatch deleteCourse and show snackbar', () => {
    component.deleteCourse('1');
    expect(dispatchSpy).toHaveBeenCalledWith(CoursesActions.deleteCourse({ id: '1' }));
    expect(snackBarSpy.open).toHaveBeenCalledWith('Course deleted', 'Close', { duration: 3000 });
  });
});
