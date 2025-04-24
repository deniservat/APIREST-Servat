import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../../../core/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { APP_CONFIG, AppConfig } from '../../../../core/injection-token';
import { CoursesService } from '../../../../core/services/courses.service';


@Component({
  selector: 'student-form',
  standalone: false,
  templateUrl: './students.form.component.html',
  styleUrls: ['./students.form.component.scss']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  coursesTitles: string[] = [];

  @Output() studentAdded = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.coursesService.getCoursesTitles();
    this.coursesService.coursesTitles$.subscribe((titles) => {
      this.coursesTitles = titles;
    });
  }

  getCoursesTitles(){
    return this.coursesService.coursesTitles$;
  }

  submit() {
    this.matDialog
      .open(DialogComponent)
      .afterClosed()
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed) {
            console.log(this.formGroup.value);
            this.studentsService.addStudentsObs(this.formGroup.value);
            this.formGroup.reset();
          }
        }
      });
  }
}
