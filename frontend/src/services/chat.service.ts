import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { ApiError } from './auth.service';

export interface AllChatMessage {
  id: number
  createdById: number
  createdByName: string
  createdAt: Date
  message: string
  isDeleted: boolean
  parentMessageId: number
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAllChatMessages(): Observable<AllChatMessage[]> {
    return this.http
      .get<AllChatMessage[]>(`${this.apiUrl}/messages`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => ({
      message: error.error?.message ?? 'An unexpected error occurred',
      statusCode: error.status,
    }) as ApiError);
  }
}
