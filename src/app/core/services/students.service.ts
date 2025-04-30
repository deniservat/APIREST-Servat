import { Injectable } from '@angular/core';
import { Student } from 'app/feature/dashboard/students/interfaces/student';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  private _students : Student[] = [
    {
      firstName: 'Martin',
      lastName: 'Reynolds',
      email: 'martin.r@gmail.com',
      course: 'angular',
    },
    {
      firstName: 'Sophie',
      lastName: 'Richards',
      email: 'soph.richards@gmail.com',
      course: 'vue',
    }
  ];

  private dataSubject = new BehaviorSubject<Student[]>([]);
  public students$ = this.dataSubject.asObservable();

  constructor() { }

  getStudents(): Student[] {
    return this._students;
  }

  getStudentsPromise(): Promise<Student[]>{
    return new Promise (resolve =>{
      setTimeout(() =>{
        resolve(this._students);
      }, 2000)
    })
  }

  getStudentsObs() {
    this.dataSubject.next(this._students);
  }

  addStudent(student:Student):void{
    this._students.push(student);
  }
  addStudentsObs(student:Student) {
    this._students = [...this._students, student];
    this.dataSubject.next(this._students);
  }


}
