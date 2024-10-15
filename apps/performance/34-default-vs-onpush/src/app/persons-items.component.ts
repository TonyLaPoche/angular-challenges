import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem } from '@angular/material/list';
import { Person } from './person';
import { PersonsItemComponent } from './persons-item.component';

@Component({
  selector: 'app-persons-items',
  imports: [
    CDFlashingDirective,
    MatDivider,
    MatList,
    MatListItem,
    NgForOf,
    NgIf,
    PersonsItemComponent,
  ],
  standalone: true,
  template: `
    <mat-list class="flex w-full">
      @if (names().length === 0) {
        <div class="empty-list-label">Empty list</div>
      }
      @for (person of names(); track person.id) {
        <app-persons-item [person]="person" [list]="list()"></app-persons-item>
      }
      @if (names().length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsItemsComponent {
  names = input.required<Person[]>();
  list = input.required<string>();
}
