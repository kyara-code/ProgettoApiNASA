import { SingleImageComponent } from './photos/single-image/single-image.component';
import { TopicComponent } from './funfacts/topic/topic.component';
import { ErrorComponent } from './error/error.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PhotosComponent } from './photos/photos.component';
import { FunfactsComponent } from './funfacts/funfacts.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'fun-facts',
    component: FunfactsComponent,
    children: [
      {
        path: 'topic',
        component: TopicComponent,
      },
    ],
  },
  {
    path: 'photos',
    component: PhotosComponent,
    children: [
      {
        path: 'single-photo',
        component: SingleImageComponent,
      },
    ],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
