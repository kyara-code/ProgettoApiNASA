import { DailyImage } from './../Model/dailyImage.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiKey: string = 'Qr4E5dURKQI1MTf08xdOpUYPgLgQz7N2U57jUkLg';

@Injectable({ providedIn: 'root' })
export class HttpReq {
  constructor(private http: HttpClient) {}

  // Chiamate Get

  onGetDailyImage() {
    return this.http.get<DailyImage>(
      'https://api.nasa.gov/planetary/apod?api_key=' + apiKey
    );
  }
}
