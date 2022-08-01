import {
  animate,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
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
      transition('* => up', [animate('2s')]),
      // transition('up => bottom', [animate('1s')]),
    ]),
  ],
})
export class ErrorComponent implements OnInit {
  stateAstronaut: string = 'bottom';
  stateText: string = 'center';
  textAnimated: boolean = false;
  astronautIsAbove: boolean = false;

  sub = new Subscription();

  @ViewChild('text', { static: true }) text = new ElementRef<any>(null);
  @ViewChild('astronaut', { static: true }) astronaut = new ElementRef<any>(
    null
  );

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.stateAstronaut = 'up';
    }, 1000);
  }

  @HostListener('mousemove', ['$event'])
  check() {
    if (this.stateAstronaut === 'moving') {
      this.stateAstronaut = 'up';
    }

    let astronaut = getComputedStyle(
      this.astronaut.nativeElement
    ).transform.split(',');
    let astronautBottom = Math.floor(-+astronaut[5].split(')')[0]);
    let astronautTop = Math.floor(window.innerHeight - 200 - astronautBottom);

    const text = Math.floor((window.innerHeight - 238.8) / 2);

    if (astronautBottom > 0 && astronautTop < window.innerHeight - 200) {
      if (astronautBottom > window.innerHeight - 250) {
        this.astronautIsAbove = true;
        // console.log('bottom in if: ', astronautBottom);
        // this.stateAstronaut = 'up';

        astronautBottom = window.innerHeight - 200;
        astronautTop = 0;
        this.astronaut.nativeElement.style.transform =
          'translateX(-50%) translateY(calc(-100vh + 200px))';
      } else {
        this.astronautIsAbove = false;
        // console.log('bottom in else: ', astronautBottom);
        // this.sub.unsubscribe();

        this.stateAstronaut = 'moving';

        // astronautBottom = 0;
        // astronautTop = window.innerHeight - 200;
        // this.astronaut.nativeElement.style.transform =
        //   'translateX(-50%) translateY(0)';

        // astronautBottom = Math.floor(-+astronaut[5].split(')')[0]);
        // astronautTop = Math.floor(window.innerHeight - 200 - astronautBottom);
      }
    } else {
      this.astronautIsAbove = false;
      astronautBottom = 0;
      astronautTop = window.innerHeight - 200;
      this.astronaut.nativeElement.style.transform =
        'translateX(-50%) translateY(0)';
    }

    if (text <= astronautBottom + 100 && text >= astronautBottom - 150) {
      this.textAnimated = true;
    } else if (text <= astronautTop + 200 && text >= astronautTop + 450) {
      this.textAnimated = true;
    } else {
      this.textAnimated = false;
    }

    console.log('bottom: ' + astronautBottom);
    console.log('top: ' + astronautTop);
  }
}
