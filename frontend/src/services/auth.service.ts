import { Injectable, inject } from '@angular/core';
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

    register(data: RegisterRequest): Observable<RegisterResponse> {
        return this.http
            .post<RegisterResponse>(`${this.apiUrl}/users/authenticate`, data)
            .pipe(
                map((response) => response),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        const apiError: ApiError = {
            message: error.error?.message ?? 'An unexpected error occurred',
            statusCode: error.status,
        };

        return throwError(() => apiError);
    }
}