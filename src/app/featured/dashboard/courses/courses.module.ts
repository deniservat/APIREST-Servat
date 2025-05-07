import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FormComponent } from './components/form/courses.form.component';
import { TableComponent } from './components/table/courses.table.component';
import { CoursesComponent } from './courses.component';
import { DetailsComponent } from './pages/details/details.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    CoursesComponent,
    DetailsComponent,
    CourseDialogComponent
    ],
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
    CoursesComponent, 
    DetailsComponent, 
    RouterModule, 
    TableComponent,
    FormComponent],
})
export class CoursesModule {}
