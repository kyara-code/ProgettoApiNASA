import { MarsPhoto } from './../Model/marsPhoto.model';
import { DailyImage } from './../Model/dailyImage.model';
import { NewsModel } from './../Model/news.model';

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

  newsArray = [
    {
      id: 1,
      title: 'First News: the James Webb Telescope has been launched!',
      newsText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices auctor tempor. Donec sit amet pharetra arcu. Duis eu felis rutrum velit porta elementum. Sed at lobortis eros, at pulvinar sem. Donec volutpat, odio ut sodales vehicula, nulla sem molestie risus, eget imperdiet eros lectus eget lorem. Nullam posuere velit et sem sagittis, volutpat laoreet urna tempus. Integer sit amet quam aliquet, euismod purus a, egestas magna. Etiam bibendum ultrices lectus, eget venenatis purus. Suspendisse potenti. Fusce a molestie nulla. Aliquam sit amet fermentum ex. Aliquam quis elit sed sem congue tempus eget at ante. Integer vestibulum a enim vitae.',
      imgUrl:
        'https://www.witszen.com/wp-content/uploads/2021/01/Space-Photos-By-NASA-768x576.jpg',
    },
    {
      id: 2,
      title: 'Second News: SpaceX announced another launch coming soon',
      newsText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices auctor tempor. Donec sit amet pharetra arcu. Duis eu felis rutrum velit porta elementum. Sed at lobortis eros, at pulvinar sem. Donec volutpat, odio ut sodales vehicula, nulla sem molestie risus, eget imperdiet eros lectus eget lorem. Nullam posuere velit et sem sagittis, volutpat laoreet urna tempus. Integer sit amet quam aliquet, euismod purus a, egestas magna. Etiam bibendum ultrices lectus, eget venenatis purus. Suspendisse potenti. Fusce a molestie nulla. Aliquam sit amet fermentum ex. Aliquam quis elit sed sem congue tempus eget at ante. Integer vestibulum a enim vitae.',
      imgUrl:
        'https://www.euractiv.com/wp-content/uploads/sites/2/2020/06/spacex-800x450.jpg',
    },
    {
      id: 3,
      title: 'Third News: ESA is hiring! Looking for new scientists',
      newsText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices auctor tempor. Donec sit amet pharetra arcu. Duis eu felis rutrum velit porta elementum. Sed at lobortis eros, at pulvinar sem. Donec volutpat, odio ut sodales vehicula, nulla sem molestie risus, eget imperdiet eros lectus eget lorem. Nullam posuere velit et sem sagittis, volutpat laoreet urna tempus. Integer sit amet quam aliquet, euismod purus a, egestas magna. Etiam bibendum ultrices lectus, eget venenatis purus. Suspendisse potenti. Fusce a molestie nulla. Aliquam sit amet fermentum ex. Aliquam quis elit sed sem congue tempus eget at ante. Integer vestibulum a enim vitae.',
      imgUrl:
        'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2018/11/moonwalk_in_lanzarote/18911548-1-eng-GB/Moonwalk_in_Lanzarote_pillars.jpg',
    },
    {
      id: 4,
      title: 'Fourth News: New evidence about dark matter: Oxford says',
      newsText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices auctor tempor. Donec sit amet pharetra arcu. Duis eu felis rutrum velit porta elementum. Sed at lobortis eros, at pulvinar sem. Donec volutpat, odio ut sodales vehicula, nulla sem molestie risus, eget imperdiet eros lectus eget lorem. Nullam posuere velit et sem sagittis, volutpat laoreet urna tempus. Integer sit amet quam aliquet, euismod purus a, egestas magna. Etiam bibendum ultrices lectus, eget venenatis purus. Suspendisse potenti. Fusce a molestie nulla. Aliquam sit amet fermentum ex. Aliquam quis elit sed sem congue tempus eget at ante. Integer vestibulum a enim vitae.',
      imgUrl: 'https://www.witszen.com/wp-content/uploads/2020/12/1-7.jpg',
    },
    {
      id: 5,
      title: 'Fifth News: How will the universe end? Some updates here',
      newsText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices auctor tempor. Donec sit amet pharetra arcu. Duis eu felis rutrum velit porta elementum. Sed at lobortis eros, at pulvinar sem. Donec volutpat, odio ut sodales vehicula, nulla sem molestie risus, eget imperdiet eros lectus eget lorem. Nullam posuere velit et sem sagittis, volutpat laoreet urna tempus. Integer sit amet quam aliquet, euismod purus a, egestas magna. Etiam bibendum ultrices lectus, eget venenatis purus. Suspendisse potenti. Fusce a molestie nulla. Aliquam sit amet fermentum ex. Aliquam quis elit sed sem congue tempus eget at ante. Integer vestibulum a enim vitae.',
      imgUrl: 'https://www.witszen.com/wp-content/uploads/2020/12/3-8.jpg',
    },
  ];

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

  // ---- Cambio data per l'archivio delle immagini ----

  onChangeDate() {
    if (this.startDate === this.endDate) {
      this.tempEndDate.setDate(this.tempStartDate.getDate());
    } else {
      this.tempEndDate.setDate(this.tempStartDate.getDate() - 1);
    }
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
