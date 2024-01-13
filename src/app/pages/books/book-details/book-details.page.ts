import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Book } from 'src/app/services/data.service';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage{
  bookId: number;
  book: Book;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.bookId = 0; // initialize bookId with a default value
    this.book = { author: { name: '' } } as Book; // initialize book with an empty object
  }

  ionViewWillEnter() {

    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchBookDetails(this.bookId);
  }

   private async fetchBookDetails(id: number): Promise<void> {
    // Fetch the book details from the data service using the ID
    this.book = await this.dataService.getBookById(id);
  }
}
