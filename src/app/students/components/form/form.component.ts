import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formGroup: FormGroup;

  @Output() studentAdded = new EventEmitter<any>();

  constructor (private fb: FormBuilder){
    this.formGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      course: ['']
    });
  }

  submit(){
    console.log(this.formGroup.value);

    const student = {
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      email: this.formGroup.value.email,
      course: this.formGroup.value.course,
    };

    console.log(student);
    this.studentAdded.emit(student);
    this.formGroup.reset();
  }

}
