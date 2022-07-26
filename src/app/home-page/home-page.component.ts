import { DailyImage } from './../Model/dailyImage.model';
import { Component, OnInit } from '@angular/core';
import { HttpReq } from '../Service/httpReq.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  dailyImg: DailyImage = {
    date: '',
    explanation: '',
    hdurl: '',
    url: '',
    title: '',
  };

  newsArray = [{ id: 0, title: '', newsText: '', imgUrl: '' }];

  constructor(
    private httpReqService: HttpReq,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.httpReqService.onGetDailyImage().subscribe((response) => {
      this.dailyImg = response;
    });

    // riempio news array
    this.newsArray = this.httpReqService.newsArray;
  }

  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.dailyImg.url);
  }
}
