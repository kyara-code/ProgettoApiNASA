import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FunfactsComponent } from './funfacts/funfacts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FunfactsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
