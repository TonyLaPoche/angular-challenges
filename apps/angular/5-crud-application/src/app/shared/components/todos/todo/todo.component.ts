import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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
      </div>
      <div class="content">
        <ng-content select="content"></ng-content>
      </div>
      <div class="config">
        <button (click)="update()">Update</button>
        <button (click)="delete()">Delete</button>
        <button (click)="error()">Error</button>
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
})
export class TodoComponent {
  @Input() todo?: Todo;
  todoService = inject(TodoService);

  update() {
    if (this.todo) {
      this.todoService.updateTodo(this.todo);
      console.log('update todo');
    }
  }
  delete() {
    if (this.todo) {
      this.todoService.deleteTodo(this.todo);
      console.log('delete todo');
    }
  }
  error() {
    if (this.todo) {
      this.todoService.errorTodo(this.todo);
      console.log('delete todo');
    }
  }
}
