import { Component} from '@angular/core';
import { DataService, Book, Author  } from '../../services/data.service';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})


export class BooksPage {
  public books: Book[] = [];
  public filteredBooks: Book[] = [];
  private bookAddedSubscription: Subscription;
  filterForm: FormGroup;
  authors: Author[] = [];
  languages = ['English', 'Spanish', 'French'];
  genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'Historical', 'Horror'];

  constructor(private dataService: DataService, private router: Router, private formBuilder: FormBuilder) {
    this.bookAddedSubscription = new Subscription(); // Initialize bookAddedSubscription
    this.filterForm = this.formBuilder.group({
      search: [''],
      authors: [[]],
      description: [''],
      languages: [[]],
      pagesFrom: [''],
      pagesTo: [''],
      genres: [[]]
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.refreshBooks();
    });
  }

  async ionViewWillEnter() {
    this.authors = await this.dataService.getAuthors(); // Load authors
    console.log(this.authors);
    this.refreshBooks();

    this.bookAddedSubscription = this.dataService.bookAdded$.subscribe(() => {
      this.refreshBooks();
    });
  }

  ionViewWillLeave() {
    this.bookAddedSubscription.unsubscribe();
  }

  async refreshBooks() {
    const books = await this.dataService.getBooks();
    const filters = this.filterForm.value;

    this.filteredBooks = books.filter(book =>
      (filters.search ? book.title.toLowerCase().includes(filters.search.toLowerCase()) : true) &&
      (filters.description ? book.description.toLowerCase().includes(filters.description.toLowerCase()) : true) &&
      (filters.authors.length > 0 ? filters.authors.includes(book.author) : true) &&
      (filters.languages.length > 0 ? filters.languages.includes(book.language) : true) &&
      (filters.pagesFrom ? book.pages >= filters.pagesFrom : true) &&
      (filters.pagesTo ? book.pages <= filters.pagesTo : true) &&
      (filters.genres.length > 0 ? filters.genres.includes(book.genre) : true)
    );
  }

  refresh(ev: RefresherCustomEvent) {
    this.refreshBooks();
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }
}
