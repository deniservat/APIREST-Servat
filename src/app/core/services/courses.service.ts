import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'app/featured/dashboard/courses/interfaces/courses';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  constructor (private http: HttpClient) {}

  private _courses: Course[] = [];
  private coursesSubject = new BehaviorSubject<Course[]>(this._courses);
  public courses$ = this.coursesSubject.asObservable();
  private coursesTitlesSubject = new BehaviorSubject<string[]>([]);
  public coursesTitles$ = this.coursesTitlesSubject.asObservable();

  getCourses(): void {
    this.http
      .get<Course[]>(`${environment.apiUrl}/courses`)
      .subscribe({
        next: (courses) => {
          this._courses = courses;
          this.coursesSubject.next(this._courses);
          this.coursesTitlesSubject.next(this._courses.map((course) => course.title));
        },
        error: (error) => {
          console.error('Error fetching courses:', error);
          this.coursesSubject.next([]);
        }
      });
  }
  

  getCoursesTitles(): void {
    const names = this._courses.map((course) => course.title);
    this.coursesTitlesSubject.next(names);
  }

  //metodo que devuelve una promesa
  getCoursesPromise(): Promise<Course[]> {
    return Promise.resolve(this._courses);
  }

/*   addCourse(course: Course): void {
    this._courses = [...this._courses, course];
    this.coursesSubject.next(this._courses);
    this.coursesTitlesSubject.next(this._courses.map((course) => course.title));
  } */

  addCourse(course: Course): void {
    this.http.post<Course>(`${environment.apiUrl}/courses`, course).subscribe({
      next: (course) => {
        this._courses = [...this._courses, course];
        this.coursesSubject.next(this._courses);
        this.coursesTitlesSubject.next(
          this._courses.map((course) => course.title)
        );
      },
      error: (error) => {
        console.error('Error adding course:', error);
      },
    });
  }

  getByTitle(title: string) {
    return new Observable<Course>((subscriber) => {
      const course = this._courses.find(
        (course) => course.title.toLowerCase() === title.toLowerCase()
      );

      if (course) {
        subscriber.next(course);
        subscriber.complete(); // complete the observable
      } else {
        subscriber.error('Course not found');
      }
    });
  }

/*   editCourse(oldTitle: string, updatedCourse: Course): void {
    const index = this._courses.findIndex((c) => c.title === oldTitle);
    if (index !== -1) {
      this._courses[index] = updatedCourse;
      this.coursesSubject.next([...this._courses]);
    }
  } */

    editCourse(id: string, updatedCourse: Course): void {
      this.http.put<Course>(`${environment.apiUrl}/courses/${id}`, updatedCourse).subscribe({
        next: (updated) => {
          const index = this._courses.findIndex((c) => c.id === id);
          if (index !== -1) {
            this._courses[index] = updated;
            this.coursesSubject.next([...this._courses]);
            this.coursesTitlesSubject.next(this._courses.map((c) => c.title));
          }
        },
        error: (error) => {
          console.error('Error updating course:', error);
        }
      });
    }    
    


/*   deleteCourse(title: string): void {
    this._courses = this._courses.filter((c) => c.title !== title);
    this.coursesSubject.next(this._courses);
    this.getCoursesTitles();
  } */

  deleteCourse(id: string) {
    this.http.delete<Course>(`${environment.apiUrl}/courses/${id}`).subscribe({
      next: (course) => {
        this._courses = this._courses.filter((course) => course.id !== id);
        this.coursesSubject.next(this._courses);
        this.coursesTitlesSubject.next(
          this._courses.map((course) => course.title)
        );
      },
      error: (error) => {
        console.error('Error deleting course:', error);
      },
    });
  }

}
