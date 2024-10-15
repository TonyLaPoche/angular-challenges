import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatListItem } from '@angular/material/list';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  imports: [CDFlashingDirective, MatListItem, ReactiveFormsModule],
  standalone: true,
  template: `
    <mat-list-item cd-flash class="text-orange-500">
      <div matListItemLine class="flex justify-between">
        <h3 title="Name" contenteditable (input)="onNameChange($event)">
          {{ nameCtrl.value }}
        </h3>
        <button type="button" (click)="onUpdate()">update</button>
        <button type="button" (click)="onDelete()">delete</button>
      </div>
    </mat-list-item>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent implements OnInit {
  personService: PersonService = inject(PersonService);
  person = input.required<Person>();
  list = input.required<string>();
  nameCtrl = new FormControl('', { nonNullable: true });

  ngOnInit() {
    this.nameCtrl.setValue(this.person().name);
  }

  onNameChange(newName: Event) {
    const inputElement = newName.target as HTMLInputElement;
    this.nameCtrl.setValue(inputElement.innerText);
  }

  onUpdate() {
    this.personService.updateList(this.list(), {
      name: this.nameCtrl.value,
      id: this.person().id,
    });
  }

  onDelete() {
    this.personService.deletePersonToList(this.list(), this.person().id);
  }
}
