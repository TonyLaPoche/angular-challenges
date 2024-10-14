import { Component } from '@angular/core';
import { LevelOneComponent } from './level-one.component';
import { LevelTwoComponent } from './level-two.component';

@Component({
  standalone: true,
  imports: [LevelOneComponent, LevelTwoComponent],
  selector: 'app-root',
  styles: `
    section {
      @apply flex flex-1 flex-col gap-5;
    }

    .list-item {
      @apply flex flex-row border-b px-5 pb-2;

      span {
        @apply flex-1;
      }
    }
  `,
  template: `
    <div class="mx-20 my-40 flex flex-col gap-5">
      <app-level-one></app-level-one>
      <app-level-two></app-level-two>
    </div>
  `,
})
export class AppComponent {}
