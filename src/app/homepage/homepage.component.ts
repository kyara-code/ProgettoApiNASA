import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  @ViewChild('bgImage', { static: true }) bgImage: ElementRef =
    new ElementRef<any>(null);

  // initialTop: number = 0;
  // parallaxRatio: number = 0;
  top: number = 0;
  opacity: number = 1;
  lastScrollTop: number = 0;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(event: any) {
    const topEl = this.bgImage.nativeElement.style.top;
    const opacityEl = this.bgImage.nativeElement.style.opacity;

    const rect = this.bgImage.nativeElement.getBoundingClientRect();
    if (rect.bottom >= 0 && rect.bottom <= window.innerHeight) {
      // when the div is visible in viewport change the top (not more than the top of the content)
      let top = rect.top;
      var st = window.pageYOffset || document.documentElement.scrollTop;
      let vel = Math.abs(st - this.lastScrollTop);

      // DA AGGIUSTARE: in base alla velocità deve aumentare o diminuire il rate di opacità / top
      vel = vel / 150;

      if (st > this.lastScrollTop) {
        this.top = 0.4 * top;
        this.opacity = 0.9 * opacityEl;
      } else {
        this.top = -0.4 * top;
        this.opacity = 1.2 * opacityEl;
        // this.opacity = 1.9 * opacityEl;
        if (this.opacity > 1) {
          this.opacity = 1;
        }
      }
      this.lastScrollTop = st <= 0 ? 0 : st;
    }
  }
}
