import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { LoginLayoutComponent } from '../loginLayout/loginLayout.component';
import { AuthService, ApiError } from '../../../services/auth.service';

interface LoginData {
  email: string
  password: string
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [LoginLayoutComponent, FormField, JsonPipe, RouterLink],
  styleUrls: ['../loginPages.css'],
  templateUrl: './login.html',
})
export class LoginComponent {
  private router = inject(Router);
  private readonly authService = inject(AuthService);

  showPassword = signal(false);
  errorMessange = signal('');
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.loginForm, {
      action: async () => {
        function sha256(value: string): string {
          return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
        }

        const { email, password } = this.loginModel();
        const hashedPassword = sha256(password);

        this.authService.login({ email, password: hashedPassword }).subscribe({
          next: (response) => {
            if (response) {
              this.errorMessange.set('');
              this.router.navigate(['']);
            }
            else {
              this.errorMessange.set('Login failed. Check your email and password.');
            }
          },
          error: (error: ApiError) => {
            this.errorMessange.set(error.message);
          },
        });
      },
    });
  }

  showPasswordClick() {
    this.showPassword.update(value => !value);
  }
}
