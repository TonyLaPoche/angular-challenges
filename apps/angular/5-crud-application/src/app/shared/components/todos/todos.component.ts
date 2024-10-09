import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';
import { TodoService } from './todo.service';
import { TodoComponent } from './todo/todo.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinner, TodoComponent],
  selector: 'app-todos',
  template: `
    @if (loader()) {
      <mat-spinner></mat-spinner>
    } @else {
      <ul class="list">
        @for (todo of todos(); track todo.id) {
          <app-todo [todo]="todo">
            <p ngProjectAs="id">N°{{ todo.id }}</p>
            <p ngProjectAs="content">{{ todo.title }}</p>
          </app-todo>
        }
      </ul>
    }
  `,
  styles: `
    :host {
      margin: 0 auto;
      box-sizing: border-box;
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      list-style: none;
      max-width: 600px;
      padding: 0.5rem;
    }
  `,
})
export class TodosComponent implements OnInit {
  loader: Signal<boolean> = inject(LoaderService).loader;
  todoService = inject(TodoService);

  todos = this.todoService.todos;

  ngOnInit() {
    this.todoService.getTodos();
  }
}
