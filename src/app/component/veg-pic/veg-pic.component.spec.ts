import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VegPicComponent } from './veg-pic.component';

describe('VegPicComponent', () => {
  let component: VegPicComponent;
  let fixture: ComponentFixture<VegPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VegPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
