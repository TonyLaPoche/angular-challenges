import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PersonService } from './person.service';
import { PersonsComponent } from './persons.component';
import { RandomComponent } from './random.component';

@Component({
  standalone: true,
  imports: [RandomComponent, PersonsComponent],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <app-persons [names]="boys()" title="Male"></app-persons>
      <app-persons [names]="girls()" title="Female"></app-persons>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  personService: PersonService = inject(PersonService);
  girls = this.personService.girls;
  boys = this.personService.boys;
}
