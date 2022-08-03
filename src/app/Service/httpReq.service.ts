import { MarsPhoto } from './../Model/marsPhoto.model';
import { DailyImage } from './../Model/dailyImage.model';
import { NewsModel } from './../Model/news.model';
import { Subscriber } from './../Model/subscriber.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiKey: string = 'Qr4E5dURKQI1MTf08xdOpUYPgLgQz7N2U57jUkLg';
@Injectable({ providedIn: 'root' })
export class HttpReq {
  tempStartDate = new Date();
  tempEndDate = new Date();
  startDate: string = '';
  endDate: string = '';
  imageArray: DailyImage[] = [];

  constructor(private http: HttpClient) {}

  // Chiamate Get

  onGetDailyImage() {
    return this.http.get<DailyImage>(
      'https://api.nasa.gov/planetary/apod?api_key=' + apiKey
    );
  }

  onGetNews() {
    return this.http.get<NewsModel[]>(
      'https://api.spaceflightnewsapi.net/v3/articles?_limit=5'
    );
  }

  onGetFunFacts(chosenTopic: string) {
    return this.http.get<NewsModel[]>(
      'https://api.spaceflightnewsapi.net/v3/blogs?_limit=5&summary_contains=' +
        chosenTopic
    );
  }

  onGetDailyImageArchive() {
    this.onChangeDate();
    return this.http.get<DailyImage[]>(
      'https://api.nasa.gov/planetary/apod?api_key=' +
        apiKey +
        '&start_date=' +
        this.startDate +
        '&end_date=' +
        this.endDate
    );
  }

  // Chiamate Post

  onSubcribeMailList(subscriber: Subscriber) {
    this.http.post(
      'https://console.firebase.google.com/project/nasa-project-cf82c/database/nasa-project-cf82c-default-rtdb/data/~2F',
      subscriber
    );
  }

  // ---- Cambio data per l'archivio delle immagini ----

  onChangeDate() {
    let endDateVar;
    if (this.endDate) {
      endDateVar = new Date(this.endDate);
    } else {
      endDateVar = new Date();
    }

    if (this.startDate === this.endDate) {
      endDateVar.setDate(this.tempStartDate.getDate());
    } else {
      endDateVar.setDate(this.tempStartDate.getDate() - 1);
    }

    if (endDateVar.getDate() > this.tempEndDate.getDate()) {
      endDateVar.setMonth(this.tempEndDate.getMonth() - 1);
    }
    this.tempEndDate = endDateVar;
    this.tempStartDate.setDate(this.tempStartDate.getDate() - 12);
    this.startDate = this.tempStartDate.toISOString().split('T')[0];
    this.endDate = this.tempEndDate.toISOString().split('T')[0];
  }

  onResetDate() {
    this.tempEndDate = new Date();
    this.tempStartDate = new Date();
    this.startDate = '';
    this.endDate = '';
  }

  // ---------------------------------------------------

  // ---- invio delle email ----

  onSendEmail(
    fromName: string,
    fromEmail: string,
    subject: string,
    body: string
  ) {
    return this.http.post('http://localhost:8080/sendingemail', {
      to: 'ccproject.mailbox@gmail.com',
      subject: 'Message from ' + fromName + ' ' + fromEmail + ' - ' + subject,
      message: body,
    });
  }

  // ---------------------------
}
