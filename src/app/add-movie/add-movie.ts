import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { Movie } from '../models/movie';

import { MoviesService } from '../services/movies';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-movie.html',
  styleUrls: ['./add-movie.css']
})

export class AddMovieComponent {

  movie: Movie = {
    title: '',
    synopsis: '',
    year: 0,
    cover: ''
  };

  constructor(
    private movieService: MoviesService,
    private router: Router
  ) {}

  saveMovie(): void {

    this.movieService
      .addMovie(this.movie)
      .subscribe({

        next: () => {

          alert('Película agregada');

          this.router.navigate(['/movies']);

        },

        error: (error) => {

          console.error(error);

          alert('Error al guardar');

        }

      });

  }

}