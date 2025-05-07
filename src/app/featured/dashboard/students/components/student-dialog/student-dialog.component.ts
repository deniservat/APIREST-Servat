import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../interfaces/student';
import { CoursesService } from '@core/services/courses.service';

@Component({
  selector: 'student-dialog',
  standalone: false,
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit {
  formGroup!: FormGroup;
  coursesTitles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private coursesService: CoursesService // ← este!
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      course: [this.data.course, Validators.required]
    });
  
    // suponiendo que tenés un servicio de cursos
    this.coursesService.courses$.subscribe((courses) => {
      this.coursesTitles = courses.map(c => c.title); // o simplemente `courses` si ya es string[]
    });
  }
  
  

  confirm(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value); // Devuelve el curso actualizado
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Cierra sin cambios
  }
}
