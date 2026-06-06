import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

const TOKEN_STORAGE_KEY = 'jwt_token';
const LAST_ACTIVITY_KEY = 'lastActivity';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
