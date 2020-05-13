import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodCreateComponent } from './good-create.component';

describe('GoodCreateComponent', () => {
  let component: GoodCreateComponent;
  let fixture: ComponentFixture<GoodCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
