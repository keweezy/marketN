import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fruit-pic',
  templateUrl: './fruit-pic.component.html',
  styleUrls: ['./fruit-pic.component.scss'],
  providers: [NgbCarouselConfig]
})
export class FruitPicComponent implements OnInit {
  images;
  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(config: NgbCarouselConfig) {
    this.images = [1, 2].map((n) => `assets/images/bg_${n}.jpg`);
  }

  ngOnInit(): void {
  }

}
