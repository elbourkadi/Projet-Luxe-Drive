import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInscriptionComponent } from './popup-inscription.component';

describe('PopupInscriptionComponent', () => {
  let component: PopupInscriptionComponent;
  let fixture: ComponentFixture<PopupInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupInscriptionComponent]
    });
    fixture = TestBed.createComponent(PopupInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
