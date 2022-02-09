import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnerComponent } from './abonner.component';

describe('AbonnerComponent', () => {
  let component: AbonnerComponent;
  let fixture: ComponentFixture<AbonnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
