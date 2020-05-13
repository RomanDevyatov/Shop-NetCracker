import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiscountComponent } from './update-discount.component';

describe('UpdateDiscountComponent', () => {
  let component: UpdateDiscountComponent;
  let fixture: ComponentFixture<UpdateDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
