import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterVoitureComponent } from './ajouter-voiture.component';

describe('AjouterVoitureComponent', () => {
  let component: AjouterVoitureComponent;
  let fixture: ComponentFixture<AjouterVoitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterVoitureComponent]
    });
    fixture = TestBed.createComponent(AjouterVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
