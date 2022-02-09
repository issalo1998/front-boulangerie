import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCaisseComponent } from './detail-caisse.component';

describe('DetailCaisseComponent', () => {
  let component: DetailCaisseComponent;
  let fixture: ComponentFixture<DetailCaisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
