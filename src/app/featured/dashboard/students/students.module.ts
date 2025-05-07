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
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [FormComponent, TableComponent, StudentsComponent, StudentDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule, 
  ],
  exports: [
    StudentsComponent,
    RouterModule, 
    TableComponent,
    FormComponent],
    
  providers: [
    StudentsService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: 'outline' },
    { provide: 'TITLE', useValue: 'Listado de alumnos' }
  ]
})
export class StudentsModule {}
