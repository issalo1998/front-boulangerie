import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreesortieComponent } from './entreesortie.component';

describe('EntreesortieComponent', () => {
  let component: EntreesortieComponent;
  let fixture: ComponentFixture<EntreesortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntreesortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreesortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
