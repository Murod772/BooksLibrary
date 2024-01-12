import { Component, OnInit } from '@angular/core';
import { DataService, Author } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.page.html',
  styleUrls: ['./author-details.page.scss'],
})
export class AuthorDetailsPage implements OnInit {
  authorId: number;
  author: Author;
  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.authorId = 0; // initialize bookId with a default value
    this.author = {} as Author; // initialize book with an empty object
   }

  ngOnInit() {

    this.authorId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchAuthorDetails(this.authorId);
    console.log(this.author);
  }

  private async fetchAuthorDetails(id: number): Promise<void> {
    // Fetch the book details from the data service using the ID
    this.author = await this.dataService.getAuthorById(id);
  }

}
