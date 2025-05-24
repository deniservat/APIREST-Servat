import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Course } from '../../interfaces/courses';
import { CoursesActions } from '../../store/courses.actions'; // <-- Importa tus acciones

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
    private store: Store,
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
      const updatedCourse: Course = this.formGroup.value;
      this.store.dispatch(CoursesActions.updateCourse({ course: updatedCourse }));
      this.dialogRef.close(updatedCourse);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
