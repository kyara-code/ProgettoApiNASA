import {
  animate,
  state,
  style,
  trigger,
  animation,
  transition,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
          transform: 'translateX(-50%) translateY(-400px)',
        })
      ),
      transition('bottom => up', [animate('1s')]),
    ]),
  ],
})
export class ErrorComponent implements OnInit {
  stateAstronaut: string = 'bottom';
  stateText: string = 'center';

  // @ViewChild('text', { static: true }) text = new ElementRef<any>(null);
  // @ViewChild('astronaut', { static: true }) astronaut: ElementRef | undefined;

  constructor() {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.stateAstronaut = 'up';
    // }, 6000);
    // console.log(this.astronaut);
  }

  onMove() {
    this.stateAstronaut = this.stateAstronaut === 'up' ? 'bottom' : 'up';
    console.log('Porca puttana ' + this.stateAstronaut);
  }

  private check() {}
}
