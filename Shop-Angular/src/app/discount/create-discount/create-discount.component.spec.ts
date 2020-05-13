import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscountComponent } from './create-discount.component';

describe('CreateDiscountComponent', () => {
  let component: CreateDiscountComponent;
  let fixture: ComponentFixture<CreateDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
