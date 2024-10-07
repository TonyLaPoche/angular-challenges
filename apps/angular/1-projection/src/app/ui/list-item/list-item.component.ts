import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="flex justify-between border border-black px-2 py-1">
      <ng-content />
      <ng-content select="button"></ng-content>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {}
