import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ApiError, AuthService } from '../../../services/auth.service';
import hashAlgorithm from '../../security/hashAlgorithm';
import { LoginLayoutComponent } from '../loginLayout/loginLayout.component';

interface LoginData {
  email: string
  password: string
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [LoginLayoutComponent, FormField],
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
        const { email, password } = this.loginModel();
        const hashedPassword = hashAlgorithm(password);

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
            console.error('Login failed:', error.message);
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
