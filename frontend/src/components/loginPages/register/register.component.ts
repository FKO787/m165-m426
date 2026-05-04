import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required, submit, validate } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ApiError, AuthService } from '../../../services/auth.service';
import hashAlgorithm from '../../security/hashAlgorithm';
import { LoginLayoutComponent } from '../loginLayout/loginLayout.component';

interface LoginData {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

@Component({
  selector: 'register',
  standalone: true,
  imports: [LoginLayoutComponent, FormField],
  styleUrls: ['../loginPages.css'],
  templateUrl: './register.html',
})
export class RegisterComponent {
  private router = inject(Router);
  private readonly authService = inject(AuthService);

  showPassword = signal(false);
  showConfirmPassword = signal(false);
  errorMessage = signal('');
  loginModel = signal<LoginData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
    required(schemaPath.passwordConfirm, { message: 'Confirm your password' });

    validate(schemaPath.password, (ctx) => {
      const value = ctx.value();

      if (!value) return null;
      if (value.length < 8)
        return { kind: 'minLength', message: 'Password must be at least 8 characters' };
      return null;
      // if (!/[A-Z]/.test(value))
      //  return { kind: 'uppercase', message: 'Password must contain at least one uppercase letter' };
      // if (!/[0-9]/.test(value))
      //   return { kind: 'number', message: 'Password must contain at least one number' };
      // if (!new RegExp('[!@#$%^&*()\\-_=+\\[\\]{};:\'",.<>?/\\\\|`~]').test(value))
      //   return { kind: 'specialChar', message: 'Password must contain at least one special character' };
    });

    validate(schemaPath.passwordConfirm, (ctx) => {
      const passordVal = ctx.valueOf(schemaPath.password);
      const confirm = ctx.value();

      if (!passordVal || !confirm) return null;
      if (confirm !== passordVal)
        return { kind: 'passwordMismatch', message: 'Password do not match' };

      return null;
    });
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.loginForm, {
      action: async () => {
        const { name, email, password } = this.loginModel();
        const hashedPassword = hashAlgorithm(password);

        this.authService.register({ name, email, password: hashedPassword }).subscribe({
          next: (response) => {
            if (response) {
              this.errorMessage.set('');
              this.router.navigate(['/login']);
            }
            else {
              this.errorMessage.set('Registration failed. Try an other Email.');
            }
          },
          error: (error: ApiError) => {
            console.error('Registration failed:', error.message);
            this.errorMessage.set(error.message);
          },
        });
      },
    });
  }

  showPasswordClick() {
    this.showPassword.update(value => !value);
  }

  showConfirmPasswordClick() {
    this.showConfirmPassword.update(value => !value);
  }
}
