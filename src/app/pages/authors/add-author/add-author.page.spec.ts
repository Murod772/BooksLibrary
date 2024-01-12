import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAuthorPage } from './add-author.page';

describe('AddAuthorPage', () => {
  let component: AddAuthorPage;
  let fixture: ComponentFixture<AddAuthorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddAuthorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
