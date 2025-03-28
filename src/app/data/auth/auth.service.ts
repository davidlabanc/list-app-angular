import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'auth_token';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }
  
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${environment.API_URL}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.authTokenKey, response.token);
        this.authStatus.next(true);
      })
    );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }
}
