import { DailyImage } from './../Model/dailyImage.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpReq } from '../Service/httpReq.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit, OnDestroy {
  photoArray: DailyImage[] = [];
  image: DailyImage = new DailyImage();

  popupActive: boolean = false;

  sub1 = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private httpReq: HttpReq,
    private router: Router
  ) {}

  // AO
  ngOnInit(): void {
    this.sub1 = this.httpReq.onGetDailyImageArchive().subscribe({
      next: (res) => {
        this.onFilterAndReverseArray(res);
        this.route.queryParams.subscribe((params) => {
          const id = params['id'];
          if (id) {
            this.onGetPhoto(id);
          }
        });
      },
    });
  }

  onFilterAndReverseArray(res: DailyImage[]) {
    res.reverse();
    res = res.filter((res) => res.hdurl);
    this.photoArray = this.photoArray.concat(res);
    this.httpReq.imageArray = this.photoArray;
  }

  onGetPhoto(index: number) {
    // this.image = photo;
    this.popupActive = true;
    this.router.navigate(['photos/single-photo'], {
      queryParams: { id: index },
    });
  }

  onClosePopup() {
    this.popupActive = false;
  }

  onLoadMore() {
    this.httpReq.onGetDailyImageArchive().subscribe((res) => {
      res.reverse();
      this.photoArray = this.photoArray.concat(res);
      this.httpReq.imageArray = this.photoArray;
    });
  }

  ngOnDestroy() {
    this.httpReq.onResetDate();
    this.httpReq.imageArray = [];

    this.sub1.unsubscribe();
  }
}
