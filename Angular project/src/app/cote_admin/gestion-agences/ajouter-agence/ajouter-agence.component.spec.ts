import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAgenceComponent } from './ajouter-agence.component';

describe('AjouterAgenceComponent', () => {
  let component: AjouterAgenceComponent;
  let fixture: ComponentFixture<AjouterAgenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterAgenceComponent]
    });
    fixture = TestBed.createComponent(AjouterAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
