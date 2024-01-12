import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAuthorPage } from './add-author.page';

const routes: Routes = [
  {
    path: '',
    component: AddAuthorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAuthorPageRoutingModule {}
