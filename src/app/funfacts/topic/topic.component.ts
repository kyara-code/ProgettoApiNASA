import { ActivatedRoute, Params } from '@angular/router';
import { HttpReq } from './../../Service/httpReq.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  chosenTopic: string = 'Earth';
  funfactsArray = [{ id: 0, title: '', newsText: '', imgUrl: '' }];

  constructor(private httpReq: HttpReq, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.chosenTopic = queryParams['id'];
    });
    //Mettere un get che in base al valore di chosenTopic permetta di salvare le curiosità dell'argomento
    this.funfactsArray = this.httpReq.newsArray;
  }
}
