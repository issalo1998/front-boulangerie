import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vagues2Component } from './vagues2.component';

describe('Vagues2Component', () => {
  let component: Vagues2Component;
  let fixture: ComponentFixture<Vagues2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vagues2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vagues2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
