import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.page.html',
  styleUrls: ['./author-edit.page.scss'],
})
export class AuthorEditPage{
  editForm: FormGroup;
  authorId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      biography: [''],
    });
  }

  ionViewWillEnter() {
    this.authorId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.loadAuthorData();
  }

  async loadAuthorData() {
    const author = await this.dataService.getAuthorById(this.authorId);
    if (author) {
      this.editForm.patchValue(author);
    }
  }

  async saveAuthor() {
    if (this.editForm.valid) {
      await this.dataService.updateAuthor(this.authorId, this.editForm.value);
      this.router.navigate(['/authors']); // navigate to authors page
    }
  }
}
