import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../interfaces/courses';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { RootState } from '@core/store';
import {
  selectCourses,
  selectError,
  selectIsLoading,
} from '../../store/courses.selectors';
import { CoursesActions } from '../../store/courses.actions';

@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './courses.table.component.html',
  styleUrls: ['./courses.table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'description', 'see-more', 'edit', 'delete'];
  private destroy$ = new Subject<void>();

  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store<RootState>
  ) {
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());
  }

  openEditDialog(course: Course): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '400px',
      data: course,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.store.dispatch(CoursesActions.editCourse({ id: result.id, course: result }));
        } else {
          this.store.dispatch(CoursesActions.addCourse({ course: result }));
        }
      }
    });
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.deleteCourse({ id }));
    this.snackBar.open('Course deleted', 'Close', { duration: 3000 });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
