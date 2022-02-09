import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarineComponent } from './farine.component';

describe('FarineComponent', () => {
  let component: FarineComponent;
  let fixture: ComponentFixture<FarineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
