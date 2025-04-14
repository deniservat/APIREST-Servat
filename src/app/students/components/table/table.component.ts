import { Component} from '@angular/core';
import { Student } from '../../interfaces/student';


@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent  {
  displayedColumns: string[] = ['fullName', 'email', 'course'];
  dataSource: Student[] = [];

  students: Student[] = [
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

  constructor() {
    this.dataSource = this.students;
  }

  onStudentAdded(student: Student) {
    this.students = [...this.students, student];
    this.dataSource = this.students;
  }

}