import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodEditComponent } from './good-edit.component';

describe('GoodEditComponent', () => {
  let component: GoodEditComponent;
  let fixture: ComponentFixture<GoodEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
