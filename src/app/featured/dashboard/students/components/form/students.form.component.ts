import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../../../../../core/services/students.service';
import { CoursesService } from '../../../../../core/services/courses.service';
import {
  APP_CONFIG,
  AppConfig,
} from '../../../../../core/injection-token/index';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'student-form',
  standalone: false,
  templateUrl: './students.form.component.html',
  styleUrls: ['./students.form.component.scss'],
})
export class FormComponent implements OnInit {
  formGroup!: FormGroup;
  coursesTitles: string[] = [];


  @Input() student?: Student;
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() studentSaved = new EventEmitter<Student>();
  @Output() studentCancelled = new EventEmitter<void>();
  @Output() studentAdded = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  ngOnInit(): void {
    /*     this.coursesService.getCoursesTitles();
    this.coursesService.coursesTitles$.subscribe((titles) => {
      this.coursesTitles = titles;
    }); */
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
    });
    this.coursesService.getCoursesTitles();
    this.coursesService.coursesTitles$.subscribe((titles) => {
      this.coursesTitles = titles; // ✅ titles debe ser string[]
    });
    
  }


  getCoursesTitles() {
    return this.coursesService.coursesTitles$;
  }
/* 
  submit() {
    this.matDialog
      .open(DialogComponent)
      .afterClosed()
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed) {
            console.log(this.formGroup.value);
            
            this.studentsService.addStudent(this.formGroup.value);
            this.formGroup.reset();
          }
        },
      });
  } */

  submit(): void {
    if (this.mode !== 'create') return;
  
    this.matDialog.open(DialogComponent).afterClosed().subscribe({
      next: (confirmed: boolean) => {
        if (confirmed) {
          this.studentsService.addStudent(this.formGroup.value);
          this.formGroup.reset();
        }
      }
    });
  }

  save(): void {
    if (this.formGroup.valid) {
      this.studentSaved.emit(this.formGroup.value);
    }
  }

  cancel(): void {
    this.studentCancelled.emit();
  }
}
