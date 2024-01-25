import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContactComponent } from './page-contact.component';

describe('PageContactComponent', () => {
  let component: PageContactComponent;
  let fixture: ComponentFixture<PageContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageContactComponent]
    });
    fixture = TestBed.createComponent(PageContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
