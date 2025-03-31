import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'auth_token';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // login(credentials: { email: string; password: string }){
  //   console.log(credentials)
  // }

  login(credentials: { email: string; password: string }): Observable<any> {
    console.log(credentials);
    return this.http
      .post<{ token: string }>(`${environment.API_URL}/api/user/login`, credentials)
      .pipe(
        tap((response) => {
          console.log("response: ",response);
          this.cookieService.set(this.authTokenKey, response.token);
          this.authStatus.next(true);
        }),
        catchError(this.handleError('updateHero', []))
      );
  }

  private hasToken(): boolean {
    return !!this.cookieService.get(this.authTokenKey);
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as any);
    };
  }

  getToken(): string | null {
    return this.cookieService.get(this.authTokenKey);
  }
}
