import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  showFiller = false;
  authUser$: Observable<any>; // ← nombre convencional para observables

  constructor(private authService: AuthService, private router: Router) {
    this.authUser$ = this.authService.authUser$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
