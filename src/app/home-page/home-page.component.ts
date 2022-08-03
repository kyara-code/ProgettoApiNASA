import { DailyImage } from './../Model/dailyImage.model';
import { Component, OnInit } from '@angular/core';
import { HttpReq } from '../Service/httpReq.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsModel } from './../Model/news.model';

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

  newsArray: NewsModel[] = [];

  constructor(
    private httpReqService: HttpReq,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.httpReqService.onGetDailyImage().subscribe((response) => {
      this.dailyImg = response;
    });
    this.httpReqService.onGetNews().subscribe((response) => {
      this.newsArray = response;
    });
  }

  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.dailyImg.url);
  }
}
