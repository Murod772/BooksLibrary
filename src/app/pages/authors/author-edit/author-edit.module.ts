import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorEditPageRoutingModule } from './author-edit-routing.module';

import { AuthorEditPage } from './author-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuthorEditPage]
})
export class AuthorEditPageModule {}
