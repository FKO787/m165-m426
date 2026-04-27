import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../enviroments/enviroment';

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterResponse {
  success: boolean
}

export interface ApiError {
  message: string
  statusCode: number
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = environment.apiUrl;

  private readonly INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 min in ms
  private inactivityTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly _isLoggedIn = signal<boolean>(
    localStorage.getItem('isLoggedIn') === 'true',
  );

  private readonly _lastActivity = signal<number>(
    parseInt(localStorage.getItem('lastActivity') ?? '0', 10),
  );

  readonly isLoggedIn = computed(() => this._isLoggedIn());

  constructor() {
    if (this._isLoggedIn()) {
      const lastActivity = this._lastActivity();
      if (lastActivity && Date.now() - lastActivity > this.INACTIVITY_LIMIT) {
        this.logout();
      }
      else {
        this.startInactivityTimer();
        this.listenToUserActivity();
      }
    }
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${this.apiUrl}/users/register`, data)
      .pipe(catchError(this.handleError));
  }

  login(data: LoginRequest): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.apiUrl}/users/authenticate`, data)
      .pipe(
        tap((response) => {
          if (response) {
            this._isLoggedIn.set(true);
            this.updateLastActivity();
            localStorage.setItem('isLoggedIn', 'true');
            this.startInactivityTimer();
            this.listenToUserActivity();
          }
        }),
        catchError(this.handleError),
      );
  }

  logout(): void {
    this._isLoggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastActivity');
    this.clearInactivityTimer();
    this.router.navigate(['/login']);
  }

  private updateLastActivity(): void {
    const now = Date.now();
    this._lastActivity.set(now);
    localStorage.setItem('lastActivity', now.toString());
  }

  private startInactivityTimer(): void {
    this.clearInactivityTimer();
    this.inactivityTimer = setTimeout(() => {
      this.logout();
    }, this.INACTIVITY_LIMIT);
  }

  private clearInactivityTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
  }

  private listenToUserActivity(): void {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    const reset = () => {
      this.updateLastActivity();
      this.startInactivityTimer();
    };
    events.forEach(event =>
      window.addEventListener(event, reset, { passive: true }),
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
