import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmerReservationComponent } from './confirmer-reservation.component';

describe('ConfirmerReservationComponent', () => {
  let component: ConfirmerReservationComponent;
  let fixture: ComponentFixture<ConfirmerReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmerReservationComponent]
    });
    fixture = TestBed.createComponent(ConfirmerReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
