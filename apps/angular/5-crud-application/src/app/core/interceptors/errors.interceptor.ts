import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../../shared/components/todos/loader.service';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.showLoader();
  console.group('REQUEST EVENT');
  console.log(req);
  console.groupEnd();
  console.group('REQUEST NEXT');
  console.log(next);
  console.groupEnd();
  return next(req).pipe(finalize(() => loaderService.hideLoader()));
};
