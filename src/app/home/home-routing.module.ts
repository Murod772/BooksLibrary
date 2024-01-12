import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'books',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/books/books.module').then(
                (m) => m.BooksPageModule
              ),
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/books/book-details/book-details.module').then(m => m.BookDetailsPageModule)
          }
        ],
      },

      {
        path: 'authors',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../pages/authors/authors.module').then(
              (m) => m.AuthorsPageModule
            ),
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/authors/author-details/author-details.module').then(m => m.AuthorDetailsPageModule)
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('../pages/authors/author-edit/author-edit-routing.module').then(m => m.AuthorEditPageRoutingModule)
          }
        ],

      },
      {
        path: '',
        redirectTo: '/books',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
