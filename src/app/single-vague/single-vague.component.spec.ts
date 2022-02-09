import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVagueComponent } from './single-vague.component';

describe('SingleVagueComponent', () => {
  let component: SingleVagueComponent;
  let fixture: ComponentFixture<SingleVagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleVagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
