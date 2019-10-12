import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from './login-info';
import {SignUpInfo} from './signup-info';
import {tap} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.authUrl}/signin`, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(`${this.authUrl}/signup`, info, httpOptions);
  }

  refreshToken(): Observable<JwtResponse> {
    return this.http.post<any>(`${this.authUrl}/refresh`, {
      refreshToken: this.tokenStorageService.getRefreshToken()
    }).pipe(tap((jwtResponse: JwtResponse) => {
      this.tokenStorageService.saveToken(jwtResponse.accessToken);
    }));
  }
}
