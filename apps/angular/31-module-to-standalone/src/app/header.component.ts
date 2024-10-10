import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  standalone: true,
  template: `
    <div class="flex gap-2">
      <button routerLink="" class="rounded-md border border-blue-400 px-4 py-2">
        Home
      </button>
      <button
        routerLink="admin"
        class="rounded-md border border-blue-400 px-4 py-2">
        Admin
      </button>
      <button
        routerLink="user"
        class="rounded-md border border-blue-400 px-4 py-2">
        User
      </button>
    </div>
  `,
})
export class headerComponent {}
