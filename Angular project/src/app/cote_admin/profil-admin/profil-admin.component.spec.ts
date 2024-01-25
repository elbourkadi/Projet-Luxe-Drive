import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAdminComponent } from './profil-admin.component';

describe('ProfilAdminComponent', () => {
  let component: ProfilAdminComponent;
  let fixture: ComponentFixture<ProfilAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilAdminComponent]
    });
    fixture = TestBed.createComponent(ProfilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
