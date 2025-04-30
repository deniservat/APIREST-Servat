import { Component, OnInit, OnDestroy } from '@angular/core';

import { Student } from '../../interfaces/student';
import { Inject } from '@angular/core';
import { StudentsService } from '../../../../../core/services/students.service';

@Component({
  selector: 'student-table',
  standalone: false,
  templateUrl: './students.table.component.html',
  styleUrl: './students.table.component.scss',
})

export class TableComponent implements OnInit{

  displayedColumns: string[] = ['fullName', 'email', 'course'];
  dataStudents: Student[] = [];

  constructor(
    private studentsService: StudentsService,
    @Inject ('TITLE') private title: string) {
      console.log(title);
  }

  ngOnInit(): void {
    this.studentsService.getStudentsObs(); // si hace falta disparar algo
    this.studentsService.students$.subscribe((data) => {
      console.log(data);
      this.dataStudents = data;
    });
    this.studentsService.getStudentsPromise()
    .then((value) =>{
      console.log(value);
    })
    .catch((error) =>{
      console.log(error);
    })
  }
}