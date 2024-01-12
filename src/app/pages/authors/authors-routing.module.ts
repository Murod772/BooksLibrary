import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsPage } from './authors.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorsPage
  },
  {
    path: 'author-details',
    loadChildren: () => import('./author-details/author-details.module').then( m => m.AuthorDetailsPageModule)
  },
  {
    path: 'add-author',
    loadChildren: () => import('./add-author/add-author.module').then( m => m.AddAuthorPageModule)
  },
  {
    path: 'author-edit',
    loadChildren: () => import('./author-edit/author-edit.module').then( m => m.AuthorEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsPageRoutingModule {}
