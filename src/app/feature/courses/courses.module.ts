import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormComponent } from './components/form/courses.form.component';
import { TableComponent } from './components/table/courses.table.component';

@NgModule({
  declarations: [FormComponent, TableComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
  ],
  exports: [FormComponent, TableComponent],
})
export class CoursesModule {}
