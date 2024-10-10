import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { headerComponent } from './header.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, headerComponent],
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  host: {
    class: 'flex flex-col p-4 gap-3',
  },
})
export class AppComponent {}
