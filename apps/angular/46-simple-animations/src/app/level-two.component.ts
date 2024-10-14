import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-level-two',
  standalone: true,
  imports: [],
  template: `
    <section>
      <div class="list-item">
        <span>Name:</span>
        <span>Samuel</span>
      </div>

      <div class="list-item">
        <span>Age:</span>
        <span>28</span>
      </div>

      <div class="list-item">
        <span>Birthdate:</span>
        <span>02.11.1995</span>
      </div>

      <div class="list-item">
        <span>City:</span>
        <span>Berlin</span>
      </div>

      <div class="list-item">
        <span>Language:</span>
        <span>English</span>
      </div>

      <div class="list-item">
        <span>Like Pizza:</span>
        <span>Hell yeah</span>
      </div>
    </section>
  `,
  styles: ``,
  animations: [
    trigger('startAnimation', [
      state('start', style({ backgroundColor: 'blue' })),
    ]),
    transition('startAnimation => start', [
      animate('1s', style({ backgroundColor: 'red' })),
    ]),
  ],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class LevelTwoComponent {}
