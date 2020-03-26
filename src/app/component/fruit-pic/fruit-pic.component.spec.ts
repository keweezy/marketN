import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitPicComponent } from './fruit-pic.component';

describe('FruitPicComponent', () => {
  let component: FruitPicComponent;
  let fixture: ComponentFixture<FruitPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
