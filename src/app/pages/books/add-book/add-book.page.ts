import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, Author } from 'src/app/services/data.service';
import { Router } from '@angular/router';
// import { Author } from '../../authors/authors.module'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage{
  bookForm: FormGroup;
  authors: Author[] = [];

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      pages: ['', Validators.required],
      language: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  async ionViewWillEnter() {
    this.authors = await this.dataService.getAuthors();
  }
  onSubmit() {
    if (this.bookForm.valid) {
      this.dataService.addBook(this.bookForm.value, this.bookForm.value.author);

      this.bookForm.reset();
      this.router.navigate(['/books']); // navigate to books page

    }
  }
}
