import { Component } from '@angular/core';
import { DataService, Author } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.page.html',
  styleUrls: ['./add-author.page.scss'],
})
export class AddAuthorPage{

  authorForm: FormGroup;
  authors: Author[] = [];

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.authorForm = this.formBuilder.group({
      name: ['', Validators.required],
      biography: ['', Validators.required],
    });
  }

  async ionViewWillEnter() {
    this.authors = await this.dataService.getAuthors();
  }
  onSubmit() {
    if (this.authorForm.valid) {
      this.dataService.addAuthor(this.authorForm.value);
      // additional logic after submission like resetting the form or navigation
      this.authorForm.reset();
      this.router.navigate(['/authors']); // navigate to authors page

    }
  }

}
