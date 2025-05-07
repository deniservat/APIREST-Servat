import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../interfaces/courses';

@Component({
  selector: 'app-course-dialog',
  standalone: false,
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [this.data.id],
      title: [this.data.title, [Validators.required]],
      description: [this.data.description, [Validators.required]]
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
