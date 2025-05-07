import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../interfaces/courses';
import { Subject, from } from 'rxjs';
import { map, tap, filter, takeUntil } from 'rxjs/operators';
import { CoursesService } from '../../../../../core/services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './courses.table.component.html',
  styleUrls: ['./courses.table.component.scss'],
})

    export class TableComponent implements OnInit, OnDestroy {
      displayedColumns: string[] = ['id', 'title', 'description', 'see-more', 'edit', 'delete'];
      dataCourses: Course[] = [];
      private destroy$ = new Subject<void>();
    
      constructor(private coursesService: CoursesService, private dialog: MatDialog,   private snackBar: MatSnackBar) {}
    
      ngOnInit(): void {
        this.coursesService.getCourses(); // ← esto inicializa el fetch desde json-server
        this.loadInitialCourses();
      }
    
      loadInitialCourses(): void {
        // Carga normal sin filtros (podés dejarlo así si querés mostrar todo al inicio)
        this.coursesService.courses$
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            this.dataCourses = data;
          });
      }
    
      sortCourses(): void {
        from(this.coursesService.getCoursesPromise())
          .pipe(
            filter((courses) => courses.length > 0),
            map((courses) =>
              [...courses].sort((a, b) => a.title.localeCompare(b.title))
            ),
            tap((sorted) => console.log('Sorted:', sorted)),
            takeUntil(this.destroy$)
          )
          .subscribe((filteredCourses) => {
            this.dataCourses = filteredCourses;
          });
      }

        openEditDialog(course: Course): void {
          const dialogRef = this.dialog.open(CourseDialogComponent, {
            width: '400px',
            data: course
          });
        
          dialogRef.afterClosed().subscribe((result: Course | undefined) => {
            if (result) {
              this.coursesService.editCourse(course.id, result); 
            }
          });
        } 
          
        deleteCourse(id: string): void {
          this.coursesService.deleteCourse(id);
        
          // Feedback visual
          this.snackBar.open('Curso eliminado', 'Cerrar', {
            duration: 3000
          });
        }

      resetCourses(): void {
        this.coursesService.courses$
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            this.dataCourses = data;
          });
      }
    
      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
    }