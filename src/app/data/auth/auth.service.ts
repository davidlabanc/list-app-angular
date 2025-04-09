import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  catchError,
  of,
  throwError,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ApiError } from '../../errors/api-error';
import { ApiErrorMessage } from '../../interfaces/api-error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'auth_token';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string; } | ApiError<ApiErrorMessage[]>> {
    console.log(credentials);
    return this.http
      .post<{ token: string }>(
        `${environment.API_URL}/api/user/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          console.log('response: ', response);
          this.cookieService.set(this.authTokenKey, response.token);
          this.authStatus.next(true);
        }),
        catchError((error: HttpErrorResponse) => {
          return this.handleError('login', error)
        })
      );
  }

  private hasToken(): boolean {
    return !!this.cookieService.get(this.authTokenKey);
  }

  /*
   * Expected server response format:
   * {
   *   ...HttpErrorResponse,
   *   error: {
   *     errors: [
   *       { msg: string }
   *     ]
   *   },
   *   success: boolean
   * }
   */
  private handleError(operation = 'operation', error: HttpErrorResponse) {
    if (error.error.errors) {
      return throwError(() => new ApiError<ApiErrorMessage[]>(error.status, operation, error.error.errors))
    }else{
      let errorData = [{ msg: 'An unknown error has occurred!' }];
      return throwError(() => new ApiError<ApiErrorMessage[]>(error.status, operation, errorData))
    }
  }

  getToken(): string | null {
    return this.cookieService.get(this.authTokenKey);
  }
}
