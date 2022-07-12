import { MarsPhoto } from './../Model/marsPhoto.model';
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

  onGetMarsPhoto() {
    this.http
      .get<{ photos: MarsPhoto[] }>(
        'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=' +
          apiKey
      )
      .subscribe((res) => {
        console.log(res.photos[0].rover);
      });
  }
}
