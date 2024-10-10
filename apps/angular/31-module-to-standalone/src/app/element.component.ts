import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-element',
  template: `
    <p>welcome to {{ key() }}</p>
  `,
})
export class ElementComponent {
  key = input();
}
