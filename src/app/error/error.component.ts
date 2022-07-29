import {
  animate,
  state,
  style,
  trigger,
  animation,
  transition,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  animations: [
    trigger('astronautMove', [
      state(
        'bottom',
        style({
          transform: 'translateX(-50%) translateY(0)',
        })
      ),
      state(
        'up',
        style({
          transform: 'translateX(-50%) translateY(calc(-100vh + 200px))',
        })
      ),
      transition('bottom => up', [animate('1s')]),
      transition('up => bottom', [animate('1s')]),
    ]),
  ],
})
export class ErrorComponent implements OnInit {
  stateAstronaut: string = 'bottom';
  stateText: string = 'center';

  sub = new Subscription();

  @ViewChild('text', { static: true }) text = new ElementRef<any>(null);
  @ViewChild('astronaut', { static: true }) astronaut = new ElementRef<any>(
    null
  );

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.stateAstronaut = 'up';
    }, 6000);

    this.sub = interval(100).subscribe(() => {
      this.check();
    });
    // console.log(this.astronaut);
  }

  private check() {
    const astronaut = getComputedStyle(
      this.astronaut.nativeElement
    ).transform.split(',');
    const astronautTop = astronaut[5].split(')');
  }
}
