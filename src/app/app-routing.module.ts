import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/dashboard/home/home.component';
import { StudentsComponent } from './feature/dashboard/students/students.component';
import { CoursesComponent } from './feature/dashboard/courses/courses.component';
import { DetailsComponent } from './feature/dashboard/courses/pages/details/details.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { LoginComponent } from './feature/auth/login/login.component';


/* const routes: Routes = [
  { path: 'auth', 
    component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
    { path: '', 
      pathMatch: 'full',
      component: HomeComponent 
    },
    { path: 'students', 
      component: StudentsComponent 
    },
    {
      path: 'courses',
      children: [
        { path: '', 
          pathMatch: 'full', 
          component: CoursesComponent 
        },
        { path: ':title', 
          component: DetailsComponent 
        },
        ],
      },
    ] },
    { path: '**', redirectTo: 'auth' },
]; */

const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' }, // redirige a home al entrar
      { path: 'home', component: HomeComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'courses', component: CoursesComponent },   // NO children aquí
      { path: 'courses/:title', component: DetailsComponent }, // Para detalles
    ]
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
