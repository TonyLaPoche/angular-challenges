import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from './todo/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/todos';
  #todos = signal<Todo[]>([]);
  todos = computed(this.#todos);

  getTodos(): void {
    this.http.get<Todo[]>(this.url).subscribe((todos) => {
      this.#todos.set(todos);
    });
  }

  updateTodo(todo: Todo): void {
    this.http.put<Todo[]>(`${this.url}/${todo.id}`, todo).subscribe((todos) => {
      this.#todos.update((todo) => todo);
    });
  }

  deleteTodo(todo: Todo): void {
    this.http.delete<Todo>(`${this.url}/${todo.id}`).subscribe((todos) => {
      this.#todos.update((todo) => todo);
    });
  }

  errorTodo(todo: Todo): void {
    this.http
      .delete<Todo>(`${this.url}/bullshitlink/${todo.id}`)
      .subscribe((todos) => {
        this.#todos.update((todo) => todo);
      });
  }
}
