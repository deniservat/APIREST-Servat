import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../interfaces/courses';
import { CoursesService } from '../../../../core/services/courses.service';
import { Inject } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { map, tap, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './courses.table.component.html',
  styleUrl: './courses.table.component.scss',
})

/* export class TableComponent implements OnInit{
  
  displayedColumns: string[] = ['title', 'description'];
  dataCourses: Course[] = [];

  constructor(
    private coursesService: CoursesService,
    @Inject ('TITLE') private title: string) {}

  ngOnInit(): void {
    this.coursesService.getCourses(); 
    this.coursesService.courses$.subscribe((data) => {
      console.log(data);
      this.dataCourses = data;
    });
  }

/*   filteredCourses$!: Observable<string[]>;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // desde PROMESA convertida a observable y filtrada
    this.filteredCourses$ = from(this.coursesService.getCoursesPromise()).pipe(
      filter((courses) => courses.length > 0),
      map((courses) => courses.map((course) => course.title.toUpperCase())),
      map((titles) => titles.sort((a, b) => a.localeCompare(b))),
      tap((result) => console.log('Filtered & sorted courses:', result))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  } */


    export class TableComponent implements OnInit, OnDestroy {
      displayedColumns: string[] = ['title', 'description'];
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