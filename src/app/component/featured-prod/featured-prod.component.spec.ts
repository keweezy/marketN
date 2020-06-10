import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProdComponent } from './featured-prod.component';

describe('FeaturedProdComponent', () => {
  let component: FeaturedProdComponent;
  let fixture: ComponentFixture<FeaturedProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
