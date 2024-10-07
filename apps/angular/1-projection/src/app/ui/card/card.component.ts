import { Component, Input } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  randomCity,
  randStudent,
  randTeacher,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="image" />
      <section class="flex flex-col gap-1">
        @for (item of list; track item.id) {
          <app-list-item>
            {{ item.firstName || item.name }}
            <button ngProjectAs="button" (click)="delete(item.id)">
              <img alt="trash" class="h-5" src="/assets/svg/trash.svg" />
            </button>
          </app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  styles: `
    .bg-light-green {
      background-color: rgba(0, 250, 0, 0.1);
    }

    .bg-light-red {
      background-color: rgba(250, 0, 0, 0.1);
    }
    .bg-light-blue {
      background-color: rgba(0, 0, 250, 0.1);
    }
  `,
  standalone: true,
  imports: [ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass:
    | 'bg-light-green'
    | 'bg-light-red'
    | 'bg-light-blue'
    | '' = '';

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  addNewItem() {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    } else if (this.type === CardType.CITY) {
      this.cityStore.addOne(randomCity());
    }
  }

  delete(id: number) {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.deleteOne(id);
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.deleteOne(id);
    } else if (this.type === CardType.CITY) {
      this.cityStore.deleteOne(id);
    }
  }
}
