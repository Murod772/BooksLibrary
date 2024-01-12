import { ComponentFixture, TestBed, waitForAsync  } from '@angular/core/testing';
import { BooksPage } from './books.page';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService, Book, Author  } from '../../services/data.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

class MockDataService {
  getAuthors = jasmine.createSpy('getAuthors').and.returnValue(Promise.resolve([]));
  getBooks = jasmine.createSpy('getBooks').and.returnValue(Promise.resolve([]));
  bookAdded$ = of(null); // Observable that represents book added event
}

describe('BooksPage', () => {
  let component: BooksPage;
  let fixture: ComponentFixture<BooksPage>;
  let mockDataService: MockDataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BooksPage],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: DataService, useClass: MockDataService }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAuthors and getBooks on init', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(mockDataService.getAuthors).toHaveBeenCalled();
      expect(mockDataService.getBooks).toHaveBeenCalled();
    });
  }));

  it('should filter books based on search criteria', waitForAsync(() => {
    const mockBooks = [
      { title: 'Book 1', author: 'Author 1', pages: 100, language: 'English', genre: 'Fantasy', id: 1 },
      { title: 'Book 2', author: 'Author 2', pages: 150, language: 'French', genre: 'Horror', id: 2 }
    ];

    mockDataService.getBooks.and.returnValue(Promise.resolve(mockBooks));
    component.refreshBooks();

    fixture.whenStable().then(() => {
      component.filterForm.controls['search'].setValue('1');
      expect(component.filteredBooks.length).toBe(1);
      expect(component.filteredBooks[0].title).toContain('Book 1');
    });
  }));

  
});
