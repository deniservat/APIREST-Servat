import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../interfaces/courses';
import { Subject, from } from 'rxjs';
import { map, tap, filter, takeUntil } from 'rxjs/operators';
import { CoursesService } from '../../../../../core/services/courses.service';

@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './courses.table.component.html',
  styleUrl: './courses.table.component.scss',
})

    export class TableComponent implements OnInit, OnDestroy {
      displayedColumns: string[] = ['title', 'description', 'see-more'];
      dataCourses: Course[] = [];
      private destroy$ = new Subject<void>();
    
      constructor(private coursesService: CoursesService) {}
    
      ngOnInit(): void {
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