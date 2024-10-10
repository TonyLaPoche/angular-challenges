import { Route } from '@angular/router';
import { ElementComponent } from './element.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ElementComponent,
    data: {
      key: 'Accueil',
    },
  },
  {
    path: 'admin',
    component: ElementComponent,
    data: {
      key: 'Administrador',
    },
  },
  {
    path: 'user',
    component: ElementComponent,
    data: {
      key: 'User',
    },
  },
];
