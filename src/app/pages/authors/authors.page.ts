import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Author } from '../../services/data.service';
import { RefresherCustomEvent } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.page.html',
  styleUrls: ['./authors.page.scss'],
})
export class AuthorsPage{
  public authors: Author[] = [];
  private authorAddedSubscription: Subscription;

  constructor(private dataService: DataService, private router: Router) {

    this.authorAddedSubscription = new Subscription(); // initialize authorAddedSubscription with a new Subscription

  }

  editAuthor(authorId: number) {
    this.router.navigate([`/authors/edit/${authorId}`]);  // Adjust the route as per your app's routes
  }


  navigateToAuthorDetail(authorId: number) {
    this.router.navigate([`/authors/${authorId}`]);  // Navigate to author detail
  }
  async ionViewWillEnter() {
    this.refreshAuthors();
    this.authorAddedSubscription = this.dataService.authorAdded$.subscribe(() => {
      this.refreshAuthors();
    });
  }
  ionViewWillLeave() {
    this.authorAddedSubscription.unsubscribe();
  }


  refreshAuthors() {
    this.dataService.getAuthors().then(authors => {
      this.authors = authors;
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

}
