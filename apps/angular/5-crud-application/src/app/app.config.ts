import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { INTERCEPTORS } from './core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors(INTERCEPTORS))],
};
