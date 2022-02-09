import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaguesComponent } from './vagues.component';

describe('VaguesComponent', () => {
  let component: VaguesComponent;
  let fixture: ComponentFixture<VaguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
