import {
  animate,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';
import { CdkDrag, CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
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
export class ErrorComponent implements OnInit, OnDestroy {
  stateAstronaut: string = 'bottom';
  stateText: string = 'center';
  textAnimated: boolean = false;
  astronautIsAbove: boolean = false;

  sub = new Subscription();

  @ViewChild('text', { static: true }) text = new ElementRef<any>(null);
  @ViewChild('dragDiv', { static: true }) dragDiv = new ElementRef<any>(null);
  @ViewChild('astronaut', { static: true }) astronaut = new ElementRef<any>(
    null
  );

  @ViewChild('star1', { static: true }) star1 = new ElementRef<any>(null);
  @ViewChild('star2', { static: true }) star2 = new ElementRef<any>(null);
  @ViewChild('star3', { static: true }) star3 = new ElementRef<any>(null);
  @ViewChild('star4', { static: true }) star4 = new ElementRef<any>(null);

  constructor() {}

  ngOnInit(): void {
    this.start();
  }

  @HostListener('mousemove', ['$event'])
  moveDivs(event: MouseEvent) {
    const x = (window.innerWidth - event.pageX) / 80;
    const y = (window.innerHeight - event.pageY) / 80;

    this.dragDiv.nativeElement.style.transform = `translateX(${x}px) translateY(${y}px)`;
    this.text.nativeElement.style.transform = `translateX(calc(-50% + ${-x}px)) translateY(calc(-50% + ${-y}px))`;

    const xstars = (window.innerWidth - event.pageX) / 20;
    const ystars = (window.innerHeight - event.pageY) / 20;

    this.star1.nativeElement.style.transform = `translateX(calc(${xstars}px + 50%)) translateY(calc(${ystars}px + 50%)) scale(-1, 1)`;
    this.star2.nativeElement.style.transform = `translateX(calc(${-xstars}px - 100%)) translateY(${ystars}px) scale(-1, 1)`;
    this.star3.nativeElement.style.transform = `translateX(calc(${xstars}px - 100%)) translateY(${-ystars}px)`;
    this.star4.nativeElement.style.transform = `translateX(${-xstars}px) translateY(${-ystars}px)`;
  }

  stop(event: CdkDragEnd) {
    this.sub.unsubscribe();
    console.log('parto', event);
    this.stateAstronaut = 'bottom';
    this.stateText = 'center';
    this.textAnimated = false;
    this.astronautIsAbove = false;
    this.astronaut.nativeElement.style.transform =
      'translateX(50%) translateY(0)';
    event.source._dragRef.reset();
    this.start();
  }

  start() {
    setTimeout(() => {
      this.stateAstronaut = 'up';
    }, 1000);
    this.sub = interval(100).subscribe(() => {
      this.check();
    });
  }

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

        // this.stateAstronaut = 'moving';

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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
