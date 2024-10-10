import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';
import { TodoService } from './todo.service';
import { TodoComponent } from './todo/todo.component';
import { Todo } from './todo/todo.model';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinner, TodoComponent, MatProgressBar],
  selector: 'app-todos',
  template: `
    @if (loader()) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
    <ul class="list">
      @for (todo of todos(); track todo.id) {
        @defer (on viewport) {
          <app-todo [todo]="todo" (onUpdate)="updateTodo($event)">
            <p ngProjectAs="id">N°{{ todo.id }}</p>
            <p ngProjectAs="content">{{ todo.title }}</p>
          </app-todo>
        } @placeholder {
          <mat-spinner class="spinner"></mat-spinner>
        }
      }
    </ul>
  `,
  styles: `
    :host {
      width: 100%;
      box-sizing: border-box;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      list-style: none;
      max-width: 600px;
      padding: 0.5rem;
      margin: 0 auto;

      & .spinner {
        align-self: center;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  loader: Signal<boolean> = inject(LoaderService).loader;
  todoService = inject(TodoService);
  todos = signal<Todo[]>([]);

  constructor() {
    this.todoService.getTodos().subscribe((todos) => this.todos.set(todos));
  }

  updateTodo(newTodo: Todo) {
    console.log('Update newTodo');
    console.log(newTodo);
    this.todoService.updateTodo(newTodo).subscribe((todos) => {
      this.todos.update((todos) =>
        todos.map((todo: Todo) => (todo.id === newTodo.id ? newTodo : todo)),
      );
    });
  }
}
