import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFonctionneComponent } from './comment-fonctionne.component';

describe('CommentFonctionneComponent', () => {
  let component: CommentFonctionneComponent;
  let fixture: ComponentFixture<CommentFonctionneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentFonctionneComponent]
    });
    fixture = TestBed.createComponent(CommentFonctionneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
