import { Routes } from '@angular/router';

import { HomeComponent } from './home/home';

import { MoviesComponent } from './movies/movies';

import { MovieDetailComponent } from './movie-detail/movie-detail';

import { AddMovieComponent } from './add-movie/add-movie';

import { EditMovieComponent } from './edit-movie/edit-movie';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'movies',
    component: MoviesComponent
  },

  {
    path: 'movies/:id',
    component: MovieDetailComponent
  },

  {
    path: 'add-movie',
    component: AddMovieComponent
  },

  {
    path: 'edit-movie/:id',
    component: EditMovieComponent
  }

];