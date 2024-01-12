import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Book } from 'src/app/services/data.service';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  bookId: number;
  book: Book;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.bookId = 0; // initialize bookId with a default value
    this.book = {} as Book; // initialize book with an empty object
  }

  ngOnInit() {

    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchBookDetails(this.bookId);
    console.log(this.book);
  }

   private async fetchBookDetails(id: number): Promise<void> {
    // Fetch the book details from the data service using the ID
    this.book = await this.dataService.getBookById(id);
  }
}
