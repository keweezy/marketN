import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fruit-pics',
  templateUrl: './fruit-pics.component.html',
  styleUrls: ['./fruit-pics.component.scss'],
  providers: [NgbCarouselConfig]
})
export class FruitPicsComponent implements OnInit {
  images: any;
  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(config: NgbCarouselConfig) {
    this.images = [1, 2].map((n) => `assets/images/bg_${n}.jpg`);
  }

  ngOnInit(): void {
  }

}
