import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypeCreateComponent } from './contact-type-create.component';

describe('ContactTypeCreateComponent', () => {
  let component: ContactTypeCreateComponent;
  let fixture: ComponentFixture<ContactTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
