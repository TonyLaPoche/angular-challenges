import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from './todo.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-todo',
  template: `
    <li class="item">
      <div class="id">
        <ng-content select="id"></ng-content>
        <input type="text" />
      </div>
      <div class="content">
        <ng-content select="content"></ng-content>
      </div>
      <div class="config">
        <button type="button" (click)="update()">Update</button>
        <button type="button" (click)="onDelete.emit(this.todo().id)">
          Delete
        </button>
        <button type="button" (click)="error()">Error</button>
      </div>
    </li>
  `,
  styles: `
    .item {
      display: flex;
      border: 1px solid lightgray;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;

      & .content {
        border: 1px solid lightgray;
        border-radius: 15px;
        width: 50%;
        padding: 0.5rem;
        text-align: center;
        overflow-x: auto;
      }

      & .config {
        align-self: center;
        display: flex;
        gap: 0.5rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todo = input.required<Todo>();
  todoService = inject(TodoService);
  onUpdate = output<Todo>();
  onDelete = output<number>();

  update() {
    const newTodo: Todo = {
      ...this.todo(),
      title: 'TEST ' + this.todo().id,
    };
    this.onUpdate.emit(newTodo);
  }

  error() {
    if (this.todo) {
      this.todoService.errorTodo(this.todo());
      console.log('delete todo');
    }
  }
}
