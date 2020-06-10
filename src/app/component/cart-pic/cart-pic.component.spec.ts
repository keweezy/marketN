import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPicComponent } from './cart-pic.component';

describe('CartPicComponent', () => {
  let component: CartPicComponent;
  let fixture: ComponentFixture<CartPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
