import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PersonListComponent } from './person-list.component';
import { PersonService } from './person.service';
import { RandomComponent } from './random.component';

@Component({
  standalone: true,
  imports: [PersonListComponent, RandomComponent],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <app-person-list [names]="girlList()" title="Female" />
      <app-person-list [names]="boyList()" title="Male" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  personService: PersonService = inject(PersonService);
  girlList = this.personService.Girls;
  boyList = this.personService.Boys;
}
