import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
// import { LoginService } from '../services/login.service';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor(
    // private loginService: LoginService,
    private router: Router,
    private loadingService: LoaderService) {
  }

  private totalRequests = 0;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (this.loginService.getUserLoginInfo()) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${this.loginService.getAccessToken()}`
    //     }
    //   });
    // }

    this.loadingService.setLoading(true);
    this.totalRequests++;

    return next.handle(request).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}