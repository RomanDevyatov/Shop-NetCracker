import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodDetailsComponent } from './good-details.component';

describe('GoodDetailsComponent', () => {
  let component: GoodDetailsComponent;
  let fixture: ComponentFixture<GoodDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
