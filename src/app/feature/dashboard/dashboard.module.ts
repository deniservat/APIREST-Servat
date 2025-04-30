import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    DashboardComponent, 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,  
    SharedModule, 
    RouterModule, 
    StudentsModule, 
    CoursesModule, 
    MatCardModule, 
  ],
  exports: [ DashboardComponent]
})
export class DashboardModule { }
