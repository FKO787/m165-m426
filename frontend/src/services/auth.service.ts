import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../enviroments/enviroment';
    
export interface RegisterRequest {
    name: string
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
}

export interface ApiError {
    message: string;
    statusCode: number;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    private _isLoggedIn = signal<boolean>(false);
    readonly isLoggedIn = this._isLoggedIn.asReadonly();

    register(data: RegisterRequest): Observable<RegisterResponse> {
        return this.http
            .post<RegisterResponse>(`${this.apiUrl}/users/register`, data)
            .pipe(
                map((response) => response),
                catchError(this.handleError)
            );
    }

    restoreSession() {
        const stored = localStorage.getItem('isLoggedIn');
        if (stored === 'true') this._isLoggedIn.set(true);
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        const apiError: ApiError = {
            message: error.error?.message ?? 'An unexpected error occurred',
            statusCode: error.status,
        };

        return throwError(() => apiError);
    }
}