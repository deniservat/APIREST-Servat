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


@NgModule({
  declarations: [FormComponent, TableComponent, CoursesComponent, DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule, 
    RouterModule
  ],
  exports: [CoursesComponent, DetailsComponent, RouterModule],
})
export class CoursesModule {}
