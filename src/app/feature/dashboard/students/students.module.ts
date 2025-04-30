import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { StudentsService } from '../../../core/services/students.service';
import { FormComponent } from './components/form/students.form.component';
import { TableComponent } from './components/table/students.table.component';
import { StudentsComponent } from './students.component';


@NgModule({
  declarations: [FormComponent, TableComponent, StudentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [StudentsComponent],
  providers: [
    StudentsService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: 'outline' },
    { provide: 'TITLE', useValue: 'Listado de alumnos' }
  ]
})
export class StudentsModule {}
