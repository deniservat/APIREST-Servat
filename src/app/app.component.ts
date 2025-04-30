import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Servat';
  showStudents = true;
  user!: Observable<any>;
  constructor() {
    this.user = this.getUser();
  }

  getUser(): Observable<any> {
    return of({
      username: 'Martha Smith',
      role: 'admin'
    });
  }

  toggleStudents() {
    this.showStudents = !this.showStudents;
  }
}
