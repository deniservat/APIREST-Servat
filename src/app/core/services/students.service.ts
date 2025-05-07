import { Injectable } from '@angular/core';
import { Student } from 'app/featured/dashboard/students/interfaces/student';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private _students: Student[] = [
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
    },
  ];

  private dataSubject = new BehaviorSubject<Student[]>(this._students);
  public students$ = this.dataSubject.asObservable();

  constructor() {}

  getStudents(): Student[] {
    return this._students;
  }

  getStudentsPromise(): Promise<Student[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this._students);
      }, 2000);
    });
  }

  getStudentsObs(): void {
    this.dataSubject.next(this._students);
  }

  addStudent(student: Student): void {
    console.log('📦 Adding student:', student); // 👈 log exacto
    this._students = [...this._students, student];
    this.dataSubject.next(this._students);
  }

  editStudent(email: string, updatedStudent: Student): void {
    const index = this._students.findIndex((s) => s.email === email);
    if (index !== -1) {
      this._students[index] = updatedStudent;
      this.dataSubject.next([...this._students]);
    }
  }

  deleteStudent(email: string): void {
    this._students = this._students.filter((s) => s.email !== email);
    this.dataSubject.next(this._students);
  }
}
