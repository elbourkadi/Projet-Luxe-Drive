import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCarComponent } from './cart-car.component';

describe('CartCarComponent', () => {
  let component: CartCarComponent;
  let fixture: ComponentFixture<CartCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartCarComponent]
    });
    fixture = TestBed.createComponent(CartCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
