import { DailyImage } from './../../Model/dailyImage.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { HttpReq } from 'src/app/Service/httpReq.service';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.css'],
})
export class SingleImageComponent implements OnInit {
  @Input() photo: DailyImage = {
    date: '',
    explanation: '',
    hdurl: '',
    url: '',
    title: '',
  };
  @Output() closePopup = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpReq: HttpReq
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.photo = this.httpReq.imageArray[queryParams['id']];
    });
  }

  onClose() {
    this.closePopup.emit();
    this.router.navigate(['/photos']);
  }
}
