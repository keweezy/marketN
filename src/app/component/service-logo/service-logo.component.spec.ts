import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLogoComponent } from './service-logo.component';

describe('ServiceLogoComponent', () => {
  let component: ServiceLogoComponent;
  let fixture: ComponentFixture<ServiceLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
