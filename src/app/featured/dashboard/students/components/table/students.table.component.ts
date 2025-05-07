import { Component, OnInit } from '@angular/core';
import { Student } from '../../interfaces/student';
import { Inject } from '@angular/core';
import { StudentsService } from '../../../../../core/services/students.service';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'student-table',
  standalone: false,
  templateUrl: './students.table.component.html',
  styleUrls: ['./students.table.component.scss'], 
})

export class TableComponent implements OnInit{

  displayedColumns: string[] = ['fullName', 'email', 'course', 'edit', 'delete'];
  dataStudents: Student[] = [];

  constructor(
    private studentsService: StudentsService,
    private dialog: MatDialog, // ✅ agregalo acá
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

  openEditDialog(student: Student): void {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '400px',
      data: student
    });
  
    dialogRef.afterClosed().subscribe((result: Student | undefined) => {
      if (result) {
        this.studentsService.editStudent(student.email, result);
      }
    });
  }

  deleteStudent(email: string): void {
    this.studentsService.deleteStudent(email);
  }
  
  
}