import { Component, OnInit } from '@angular/core';
import { HttpReq } from '../Service/httpReq.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  dailyImgUrl: string = '';

  constructor(private httpReqService: HttpReq) {}

  ngOnInit(): void {
    this.httpReqService.onGetDailyImage().subscribe((response) => {
      this.dailyImgUrl = response.hdurl;
      console.log(response);
    });
  }
}
