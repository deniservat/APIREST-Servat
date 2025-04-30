import { Injectable } from '@angular/core';
import { Course } from 'app/feature/dashboard/courses/interfaces/courses';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private _courses : Course[] = [
    {
      title: 'Angular',
      description: 'Angular is a framework bla bla bla',
    },
    {
      title: 'React',
      description: 'React is a framework bla bla bla',
    },
    {
      title: 'Vue',
      description: 'React is a framework bla bla bla',
    },
    {
      title: 'Svelte',
      description: 'React is a framework bla bla bla',
    }
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this._courses);
  public courses$ = this.coursesSubject.asObservable();
  private coursesTitlesSubject = new BehaviorSubject<string[]>([]);
  public coursesTitles$ = this.coursesTitlesSubject.asObservable();

  getCourses():void {
    this.coursesSubject.next(this._courses);
  }

  getCoursesTitles():void{
    const names = this._courses.map((course) => course.title);
    this.coursesTitlesSubject.next(names);
  }

  //metodo que devuelve una promesa
  getCoursesPromise(): Promise<Course[]> {
    return Promise.resolve(this._courses);
  }
  
  addCourse(course:Course):void{
    this._courses = [...this._courses, course];
    this.coursesSubject.next(this._courses);
    this.coursesTitlesSubject.next(this._courses.map((course) => course.title))
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

  constructor() { }
}
