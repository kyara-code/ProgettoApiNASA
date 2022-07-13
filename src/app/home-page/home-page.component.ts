import { DailyImage } from './../Model/dailyImage.model';
import { Component, OnInit } from '@angular/core';
import { HttpReq } from '../Service/httpReq.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  dailyImg: DailyImage | null = null;

  newsArray = [{ id: 0, title: '', newsText: '', imgUrl: '' }];

  constructor(private httpReqService: HttpReq) {}

  ngOnInit(): void {
    this.httpReqService.onGetDailyImage().subscribe((response) => {
      this.dailyImg = response;
      console.log(response);
    });

    // riempio news array
    this.newsArray = this.httpReqService.newsArray;
  }
}
