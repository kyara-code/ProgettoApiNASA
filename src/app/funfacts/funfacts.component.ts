import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funfacts',
  templateUrl: './funfacts.component.html',
  styleUrls: ['./funfacts.component.css'],
})
export class FunfactsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onNavigateToFunFacts() {
    this.router.navigate(['/fun-facts']);
  }

  onNavigateToPhotos() {
    this.router.navigate(['/photos']);
  }

  onNavigateToAboutUs() {
    this.router.navigate(['/about-us']);
  }
}
