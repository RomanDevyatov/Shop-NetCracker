import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcartComponent } from './newcart.component';

describe('NewcartComponent', () => {
  let component: NewcartComponent;
  let fixture: ComponentFixture<NewcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
