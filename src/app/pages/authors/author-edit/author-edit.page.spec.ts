import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorEditPage } from './author-edit.page';

describe('AuthorEditPage', () => {
  let component: AuthorEditPage;
  let fixture: ComponentFixture<AuthorEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AuthorEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
