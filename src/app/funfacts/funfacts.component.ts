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

  onShowEarthFunFacts() {
    this.router.navigate(['/fun-facts/topic'], {
      queryParams: { id: 'earth' },
    });
  }

  onShowSolarSystemFunFacts() {
    this.router.navigate(['/fun-facts/topic'], {
      queryParams: { id: 'solar system' },
    });
  }

  onShowExoplanetsFunFacts() {
    this.router.navigate(['/fun-facts/topic'], {
      queryParams: { id: 'exoplanets' },
    });
  }

  onShowBlackHoleFunFacts() {
    this.router.navigate(['/fun-facts/topic'], {
      queryParams: { id: 'black hole' },
    });
  }

  onShowCosmologyFunFacts() {
    this.router.navigate(['/fun-facts/topic'], {
      queryParams: { id: '' },
    });
  }
}
