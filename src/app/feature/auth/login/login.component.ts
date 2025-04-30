import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(3), Validators.required]],
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const isLoggedIn = this.authService.login(email, password);
      if (!isLoggedIn) {
        alert('Incorrect email or password');
        return;
      }
      this.router.navigate(['/dashboard']);
    }
  }
}
