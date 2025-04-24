import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/students.form.component';
import { TableComponent } from './components/table/students.table.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { StudentsService } from '../../core/services/students.service';

@NgModule({
  declarations: [FormComponent, TableComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FormComponent, TableComponent],
  providers: [
    StudentsService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: 'outline' },
    { provide: 'TITLE', useValue: 'Listado de alumnos' }
  ]
})
export class StudentsModule {}
