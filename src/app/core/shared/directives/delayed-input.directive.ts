/*
 https://www.leonelngande.com/creating-a-delayed-input-directive-in-angular/
<input type="text"
       placeholder="Search.."
       appDelayedInput
       (delayedInput)="search($event)"
       [delayTime]="600">
 */
 import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject, timer } from 'rxjs';
import { debounce, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appDelayedInput]',
})
export class DelayedInputDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // 0️⃣

  @Input() delayTime = 500; // 1️⃣
  @Input() trim: boolean;
  @Output() delayedInput = new EventEmitter<Event>(); // 2️⃣

  constructor(private elementRef: ElementRef<HTMLInputElement>) {
    // 3️⃣
  }

  ngOnInit() {
    fromEvent(this.elementRef.nativeElement, 'input') // 4️⃣
      .pipe(
        debounce(() => timer(this.delayTime)), // 5️⃣
        distinctUntilChanged(
          (previous, current) => previous === current,
          (event: Event) => (event.target as HTMLInputElement).value
        ), // 6️⃣
        takeUntil(this.destroy$) // 7️⃣
      )
      .subscribe((e) => {
        if(this.trim){
          console.log(e)
        }
        this.delayedInput.emit(e);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(); // 9️⃣
  }
}
