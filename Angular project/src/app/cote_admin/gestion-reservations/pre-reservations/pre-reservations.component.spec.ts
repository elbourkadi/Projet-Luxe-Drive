import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreReservationsComponent } from './pre-reservations.component';

describe('PreReservationsComponent', () => {
  let component: PreReservationsComponent;
  let fixture: ComponentFixture<PreReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreReservationsComponent]
    });
    fixture = TestBed.createComponent(PreReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
