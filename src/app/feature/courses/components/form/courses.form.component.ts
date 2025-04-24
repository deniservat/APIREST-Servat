import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'course-form',
  standalone: false,
  templateUrl: './courses.form.component.html',
  styleUrl: './courses.form.component.scss'
})
export class FormComponent{
  formGroup: FormGroup;

  @Output() courseAdded = new EventEmitter<any>();

  constructor (
    private fb: FormBuilder, 
    private matDialog:MatDialog, 
    private coursesService: CoursesService){
      this.formGroup = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
      });
    }

  submit(){

    this.matDialog
    .open (DialogComponent)
    .afterClosed()
    .subscribe({
      next:(confirmed:boolean) =>{
        if(confirmed){
          console.log(this.formGroup.value);
          this.coursesService.addCourse(this.formGroup.value);
          this.formGroup.reset();
        }
      }
    })
  }
}

