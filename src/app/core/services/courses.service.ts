import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'app/featured/dashboard/courses/interfaces/courses';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, of, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  private _courses: Course[] = [];
  private coursesSubject = new BehaviorSubject<Course[]>(this._courses);
  public courses$ = this.coursesSubject.asObservable();
  private coursesTitlesSubject = new BehaviorSubject<string[]>([]);
  public coursesTitles$ = this.coursesTitlesSubject.asObservable();

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses`).pipe(
      tap((courses) => {
        this._courses = courses;
        this.coursesSubject.next(this._courses);
        this.coursesTitlesSubject.next(this._courses.map((c) => c.title));
      })
    );
  }

  getCoursesTitles(): void {
    const names = this._courses.map((course) => course.title);
    this.coursesTitlesSubject.next(names);
  }

  //metodo que devuelve una promesa
  getCoursesPromise(): Promise<Course[]> {
    return Promise.resolve(this._courses);
  }

  addCourse(course: Course): Observable<Course> {
    const courseWithId = {
      ...course,
      id: course.id || uuidv4(), // si no vino con id, lo genera acá
    };

    return this.http
      .post<Course>(`${environment.apiUrl}/courses`, courseWithId)
      .pipe(
        tap((newCourse) => {
          this._courses = [...this._courses, newCourse];
          this.coursesSubject.next(this._courses);
          this.coursesTitlesSubject.next(this._courses.map((c) => c.title));
        })
      );
  }

  getByTitle(title: string) {
    return new Observable<Course>((subscriber) => {
      const course = this._courses.find(
        (course) => course.title.toLowerCase() === title.toLowerCase()
      );

      if (course) {
        subscriber.next(course);
        subscriber.complete(); 
      } else {
        subscriber.error('Course not found');
      }
    });
  }

  editCourse(id: string, updatedCourse: Course): Observable<Course> {
    return this.http
      .put<Course>(`${environment.apiUrl}/courses/${id}`, updatedCourse)
      .pipe(
        tap((course) => {
          const index = this._courses.findIndex((c) => c.id === id);
          if (index !== -1) {
            this._courses[index] = course;
            this.coursesSubject.next([...this._courses]);
            this.coursesTitlesSubject.next(this._courses.map((c) => c.title));
          }
        })
      );
  }

  deleteCourse(id: string): Observable<string> {
    return this.http.delete(`${environment.apiUrl}/courses/${id}`).pipe(
      tap(() => {
        this._courses = this._courses.filter((c) => c.id !== id);
        this.coursesSubject.next([...this._courses]);
        this.coursesTitlesSubject.next(this._courses.map((c) => c.title));
      }),
      map(() => id)
    );
  }
}
