import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAuthorPageRoutingModule } from './add-author-routing.module';

import { AddAuthorPage } from './add-author.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddAuthorPageRoutingModule
  ],
  declarations: [AddAuthorPage]
})
export class AddAuthorPageModule {}
