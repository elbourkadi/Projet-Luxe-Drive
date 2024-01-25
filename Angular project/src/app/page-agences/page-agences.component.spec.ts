import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAgencesComponent } from './page-agences.component';

describe('PageAgencesComponent', () => {
  let component: PageAgencesComponent;
  let fixture: ComponentFixture<PageAgencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAgencesComponent]
    });
    fixture = TestBed.createComponent(PageAgencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
