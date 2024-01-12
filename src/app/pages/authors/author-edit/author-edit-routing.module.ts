import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorEditPage } from './author-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorEditPageRoutingModule {}
