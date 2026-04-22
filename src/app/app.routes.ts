import { Routes } from '@angular/router';
import { Movies } from './movies/movies';

export const routes: Routes = [
  {
    path: 'movies',
    component: Movies
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  }
];