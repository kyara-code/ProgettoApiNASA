import { ActivatedRoute, Params } from '@angular/router';
import { HttpReq } from './../../Service/httpReq.service';
import { Component, OnInit } from '@angular/core';

import { NewsModel } from './../../Model/news.model';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  chosenTopic: string = 'Earth';
  funfactsArray: NewsModel[] = [];

  constructor(private httpReq: HttpReq, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('partito');
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.chosenTopic = queryParams['id'];
      this.httpReq.onGetFunFacts(this.chosenTopic).subscribe((response) => {
        this.funfactsArray = response;
      });
      if (this.chosenTopic === '') {
        this.chosenTopic = 'All Fun Facts';
      }
    });
  }
}
