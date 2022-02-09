import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisspeciauxComponent } from './fraisspeciaux.component';

describe('FraisspeciauxComponent', () => {
  let component: FraisspeciauxComponent;
  let fixture: ComponentFixture<FraisspeciauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraisspeciauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraisspeciauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
