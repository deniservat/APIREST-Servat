import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; 

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  showFiller = false;
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout(); // ✅ llama al método del servicio
    this.router.navigate(['/auth']); // ✅ redirige al login
  }
}

