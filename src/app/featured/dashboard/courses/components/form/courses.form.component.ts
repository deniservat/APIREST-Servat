import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '@core/services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
import { Course } from '../../interfaces/courses';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { Observable } from 'rxjs';
import { selectIsLoading } from '../../store/courses.selectors';
import { CoursesActions } from '../../store/courses.actions';

@Component({
  selector: 'course-form',
  standalone: false,
  templateUrl: './courses.form.component.html',
  styleUrls: ['./courses.form.component.scss']
})
export class FormComponent implements OnInit {
  formGroup!: FormGroup;
  isEdit: boolean = false;
  isLoading$: Observable<boolean>;

  @Input() course?: Course;
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() courseSaved = new EventEmitter<Course>();
  @Output() courseCancelled = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private coursesService: CoursesService,
    private store: Store<RootState>
  ) {
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [this.course?.id || ''],
      title: [this.course?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.course?.description || '', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
    if (this.mode !== 'create') return;
  
    this.matDialog.open(DialogComponent).afterClosed().subscribe({
      next: (confirmed: boolean) => {
        if (confirmed) {
          const newCourse: Course = {
            id: uuidv4(), // Se genera un ID único
            ...this.formGroup.value
          };
  
          /* this.coursesService.addCourse(newCourse);
          this.formGroup.reset(); */
          this.store.dispatch(
            CoursesActions.addCourse({course: newCourse})
          )
        }
      }
    });
  }
  
    

  save(): void {
    if (this.formGroup.valid) {
      this.courseSaved.emit(this.formGroup.value);
    }
  }

  cancel(): void {
    this.courseCancelled.emit();
  }
}
