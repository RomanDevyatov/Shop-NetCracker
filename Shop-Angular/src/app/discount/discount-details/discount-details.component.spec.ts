import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountDetailsComponent } from './discount-details.component';

describe('DiscountDetailsComponent', () => {
  let component: DiscountDetailsComponent;
  let fixture: ComponentFixture<DiscountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
