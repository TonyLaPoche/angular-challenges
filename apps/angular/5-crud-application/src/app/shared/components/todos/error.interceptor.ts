import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  private loaderService = inject(LoaderService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    console.group('REQUEST EVENT');
    console.log(req);
    console.groupEnd();
    console.group('REQUEST NEXT');
    console.log(next);
    console.groupEnd();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hideLoader()),
      catchError((error) => {
        console.log(error);
        this.loaderService.hideLoader();
        return of(error);
      }),
    );
  }
}
