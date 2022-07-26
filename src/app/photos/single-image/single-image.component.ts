import { DailyImage } from './../../Model/dailyImage.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closePopup.emit();
  }
}
