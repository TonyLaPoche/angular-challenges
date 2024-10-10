import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeavyComputePipe } from './heavy-compute.pipe';

@Component({
  standalone: true,
  imports: [NgFor, HeavyComputePipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track $index) {
      <div>
        {{ person | heavyCompute: $index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons: string[] = ['toto', 'jack'];
}
