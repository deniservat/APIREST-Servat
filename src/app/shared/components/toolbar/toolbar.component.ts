import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '@core/services/auth.service';
import { User } from 'app/featured/auth/interfaces/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  @Input() drawer!: MatDrawer;

  user$!: Observable<User | null>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.authUser$;
  }
}
