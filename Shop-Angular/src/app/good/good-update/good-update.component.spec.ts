import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodUpdateComponent } from './good-update.component';

describe('GoodUpdateComponent', () => {
  let component: GoodUpdateComponent;
  let fixture: ComponentFixture<GoodUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
