import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodosComponent } from './shared/components/todos/todos.component';

@Component({
  standalone: true,
  imports: [CommonModule, TodosComponent],
  selector: 'app-root',
  template: `
    <app-todos></app-todos>
  `,
  styles: [],
})
export class AppComponent {}
