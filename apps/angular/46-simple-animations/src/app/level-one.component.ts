import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-level-one',
  standalone: true,
  imports: [],
  template: `
    <section [@startAnimation]="'start'">
      <div>
        <h3>2008</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          mollitia sequi accusantium, distinctio similique laudantium eveniet
          quidem sit placeat possimus tempore dolorum inventore corporis atque
          quae ad, nobis explicabo delectus.
        </p>
      </div>

      <div>
        <h3>2010</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          mollitia sequi accusantium, distinctio similique laudantium eveniet
          quidem sit placeat possimus tempore dolorum inventore corporis atque
          quae ad, nobis explicabo delectus.
        </p>
      </div>

      <div>
        <h4>2012</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          mollitia sequi accusantium, distinctio similique laudantium eveniet
          quidem sit placeat possimus tempore dolorum inventore corporis atque
          quae ad, nobis explicabo delectus.
        </p>
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
export class LevelOneComponent {}
