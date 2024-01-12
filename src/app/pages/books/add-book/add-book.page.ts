import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, Author } from 'src/app/services/data.service';
import { Router } from '@angular/router';
// import { Author } from '../../authors/authors.module'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {
  bookForm: FormGroup;
  authors: Author[] = [];

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      pages: ['', Validators.required],
      language: [''],
      genre: ['']
    });
  }

  async ngOnInit() {
    this.authors = await this.dataService.getAuthors();
  }
  onSubmit() {
    if (this.bookForm.valid) {
      this.dataService.addBook(this.bookForm.value);
      // additional logic after submission like resetting the form or navigation
      this.bookForm.reset();
      this.router.navigate(['/books']); // navigate to books page

    }
  }
}
