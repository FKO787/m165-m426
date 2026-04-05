import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { email, form, FormField, required, submit, validate } from '@angular/forms/signals';
import { LoginLayoutComponent } from '../loginLayout/loginLayout.component';
import { AuthService, ApiError } from '../../services/auth.service';

interface LoginData {
    name: string;
    email: string;
    passwordConfirm: string;
    password: string;
}

@Component({
    selector: 'register',
    standalone: true,
    imports: [LoginLayoutComponent, FormField, JsonPipe],
    styleUrls: ['./register.css'],
    templateUrl: './register.html',
})
export class RegisterComponent {
    private readonly authService = inject(AuthService);

    loginModel = signal<LoginData>({
        name: '',
        email: '',
        passwordConfirm: '',
        password: '',
    });

    loginForm = form(this.loginModel, (schemaPath) => {
        required(schemaPath.name, { message: 'Name is required' });
        required(schemaPath.email, { message: 'Email is required' });
        email(schemaPath.email, { message: 'Enter a valid email address' });
        required(schemaPath.passwordConfirm, { message: 'Confirm your password' });
        required(schemaPath.password, { message: 'Password is required' });

        validate(schemaPath.passwordConfirm, (ctx) => {
            const passordVal = ctx.valueOf(schemaPath.password);
            const confirm = ctx.value();

            if (!passordVal || !confirm) return null;
            if (confirm !== passordVal) return { kind: 'passwordMismatch', message: 'Password do not match' };

            return null;
        });

        validate(schemaPath.password, (ctx) => {
            const value = ctx.value();

            if (!value) return null;
            if (value.length < 8) return { kind: 'minLength', message: 'Password must be at least 8 characters' };
            if (!/[A-Z]/.test(value)) return { kind: 'uppercase', message: 'Password must contain at least one uppercase letter' };
            if (!/[0-9]/.test(value)) return { kind: 'number', message: 'Password must contain at least one number' };
            if (!new RegExp('[!@#$%^&*()\\-_=+\\[\\]{};:\'",.<>?/\\\\|`~]').test(value)) return { kind: 'specialChar', message: 'Password must contain at least one special character' };            return null;
        });
    });

    onSubmit(event: Event): void {
        event.preventDefault();
        submit(this.loginForm, {
            action: async () => {
                function sha256(value: string): string {
                    return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
                }

                const { name, email, password } = this.loginModel();
                const hashedPassword = sha256(password);

                this.authService.register({name, email, password: hashedPassword }).subscribe({
                    next: (response) => {
                        console.log('Registered successfully:', response);
                        // Router navigation
                    },
                    error: (error: ApiError) => {
                        console.error('Registration failed:', error.message);
                    },
                });
            },
        });
    }
}