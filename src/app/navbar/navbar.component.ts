import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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
