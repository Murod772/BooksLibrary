import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

export interface Book {
  title: string;
  author: string;
  pages: number;
  language: string;
  genre: string;
  id: number;
}

export interface Author {
  name: string;
  biography: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKeys = {
    books: 'books',
    authors: 'authors',
  };

  constructor(private storage: Storage) {
    this.init();
  }

  private bookAddedSource = new Subject<Book>();
  bookAdded$ = this.bookAddedSource.asObservable();

  private authorAddedSource = new Subject<Author>();
  authorAdded$ = this.authorAddedSource.asObservable();

  async init() {
    await this.storage.create();
    // Initialize storage with default values if empty
    const books = await this.storage.get(this.storageKeys.books);
    if (!books) {
      await this.storage.set(this.storageKeys.books, []);
    }
    const authors = await this.storage.get(this.storageKeys.authors);
    if (!authors) {
      await this.storage.set(this.storageKeys.authors, []);
    }
  }

  async getBooks(): Promise<Book[]> {
    return (await this.storage.get(this.storageKeys.books)) || [];
  }

  async getBookById(id: number): Promise<Book> {
    const books = await this.getBooks();
    return books[id];
  }

  async addBook(newBook: Book): Promise<void> {
    const books = await this.getBooks();
    const newId =
      books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 0;
    newBook.id = newId;
    books.push(newBook);
    await this.storage.set(this.storageKeys.books, books);
    console.log(books)
    this.bookAddedSource.next(newBook);
  }

  async getAuthors(): Promise<Author[]> {
    return (await this.storage.get(this.storageKeys.authors)) || [];
  }

  async getAuthorById(id: number): Promise<Author> {
    const authors = await this.getAuthors();
    return authors[id];
  }

  async addAuthor(newAuthor: Author): Promise<void> {
    const authors = await this.getAuthors();
    const newId = authors.length > 0 ? Math.max(...authors.map(author => author.id)) + 1 : 0;
    newAuthor.id = newId;
    authors.push(newAuthor);
    await this.storage.set(this.storageKeys.authors, authors);

    this.authorAddedSource.next(newAuthor);
  }

  async updateAuthor(id: number, updatedAuthor: Author): Promise<void> {
    const authors = await this.storage.get('authors') || [];
    const authorIndex = authors.findIndex((author: { id: number; }) => author.id === id); // Find index of the author with the matching id

    if (authorIndex !== -1) {
      authors[authorIndex] = { ...authors[authorIndex], ...updatedAuthor };
      await this.storage.set('authors', authors);
    } else {
      console.log('Author not found');
    }
  }

  // Add other methods as needed (update, delete, etc.)
}
