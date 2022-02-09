import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebriefmoisComponent } from './debriefmois.component';

describe('DebriefmoisComponent', () => {
  let component: DebriefmoisComponent;
  let fixture: ComponentFixture<DebriefmoisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebriefmoisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebriefmoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
