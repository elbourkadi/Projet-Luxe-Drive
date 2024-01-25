import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCompteComponent } from './creer-compte.component';

describe('CreerCompteComponent', () => {
  let component: CreerCompteComponent;
  let fixture: ComponentFixture<CreerCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerCompteComponent]
    });
    fixture = TestBed.createComponent(CreerCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
