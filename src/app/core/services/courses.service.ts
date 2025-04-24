import { Injectable } from '@angular/core';
import { Course } from '../../feature/courses/interfaces/courses';
import { BehaviorSubject } from 'rxjs';

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

/*   addStudent(student:Student):void{
    this._students.push(student);
  }
  addStudentsObs(student:Student) {
    this._students = [...this._students, student];
    this.dataSubject.next(this._students);
  } */

  constructor() { }
}
