import { DailyImage } from './../Model/dailyImage.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpReq } from '../Service/httpReq.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit, OnDestroy {
  photoArray: DailyImage[] = [];
  image: DailyImage = new DailyImage();

  popupActive: boolean = false;

  constructor(private httpReq: HttpReq) {}

  // AO
  ngOnInit(): void {
    this.httpReq.onGetDailyImageArchive().subscribe({
      next: (res) => {
        this.onFilterAndReverseArray(res);
      },
    });
  }

  onFilterAndReverseArray(res: DailyImage[]) {
    res.reverse();
    res = res.filter((res) => res.hdurl);
    console.log(res);
    this.photoArray = this.photoArray.concat(res);
  }

  onGetPhoto(photo: DailyImage) {
    this.popupActive = true;
    this.image = photo;
  }

  onClosePopup() {
    this.popupActive = false;
  }

  ngOnDestroy() {
    this.httpReq.onResetDate();
  }
}
