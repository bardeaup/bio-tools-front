import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {TokenStorageService} from './token-storage.service';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {JwtResponse} from './jwt-response';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      req = this.addToken(req, token);
    }
    return next.handle(req).pipe(catchError(error => {
      if (req.url.includes('refresh') || req.url.includes('signin')) {
        if (req.url.includes('refresh')) {
          this.tokenStorageService.signOut();
        }
        return throwError(error);
      }

      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(req, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)});
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((jwtResponse: JwtResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(jwtResponse.accessToken);
          return next.handle(this.addToken(request, jwtResponse.accessToken));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(request, accessToken));
        }));
    }
  }
}
