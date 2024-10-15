import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  inject,
} from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>
      Middle
      <button class="relative" (click)="trig()">BUTTON</button>
    </div>
    <div>Bottom</div>
    <button *ngIf="displayButton$ | async" (click)="goToTop()">Top</button>
  `,
  styles: [
    `
      :host {
        height: 1500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        div > button {
          position: relative;
        }
        button {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          z-index: 1;
          padding: 1rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject.asObservable();
  private readonly zone = inject(NgZone); // Injection de NgZone
  private readonly cdr = inject(ChangeDetectorRef); // Injection de ChangeDetectorRef

  constructor() {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(
          map(() => window.scrollY > 50),
          distinctUntilChanged(), // Ne réagit que lorsque la valeur change (true <=> false)
        )
        .subscribe((shouldShowButton) => {
          // Rentrer dans la zone Angular uniquement si un changement est nécessaire
          this.zone.run(() => {
            this.displayButtonSubject.next(shouldShowButton);
            // Déclencher manuellement la détection de changement
            this.cdr.detectChanges();
          });
        });
    });
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  trig() {
    console.log('Create Event');
  }
}
