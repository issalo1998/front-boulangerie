import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVague2Component } from './single-vague2.component';

describe('SingleVague2Component', () => {
  let component: SingleVague2Component;
  let fixture: ComponentFixture<SingleVague2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleVague2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVague2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
