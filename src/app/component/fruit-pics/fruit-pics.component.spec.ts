import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitPicsComponent } from './fruit-pics.component';

describe('FruitPicsComponent', () => {
  let component: FruitPicsComponent;
  let fixture: ComponentFixture<FruitPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitPicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
