import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencesComponent } from './agences.component';

describe('AgencesComponent', () => {
  let component: AgencesComponent;
  let fixture: ComponentFixture<AgencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgencesComponent]
    });
    fixture = TestBed.createComponent(AgencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
