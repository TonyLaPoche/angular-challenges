import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { PersonService } from './person.service';

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [
    CDFlashingDirective,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
  ],
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  personService: PersonService = inject(PersonService);
  label = '';
  listRef = input.required<string>();

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.personService.addPerson(this.listRef(), this.label);
      this.label = '';
    }
  }
}
