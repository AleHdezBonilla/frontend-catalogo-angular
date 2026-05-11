import { Component, OnInit } from '@angular/core';
import { Movie, MoviesService } from '../services/movies';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css']
})
export class Movies implements OnInit {

 movies: Movie[] = [];

selectedMovieId: number | null = null;

newMovie: Movie = {
  title: '',
  synopsis: '',
  year: 0,
  cover: ''
};

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addMovie(): void {
 
  if (this.selectedMovieId) {

    this.movieService
      .updateMovie(this.selectedMovieId, this.newMovie)
      .subscribe({
        next: () => {

          console.log('Película actualizada');

          this.loadMovies();

          this.resetForm();
        },
        error: (error) => {
          console.error(error);
        }
      });

  } else {

 
    this.movieService
      .addMovie(this.newMovie)
      .subscribe({
        next: () => {

          console.log('Película agregada');

          this.loadMovies();

          this.resetForm();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}

editMovie(movie: Movie): void {

  this.selectedMovieId = movie.id!;

  this.newMovie = {
    title: movie.title,
    synopsis: movie.synopsis,
    year: movie.year,
    cover: movie.cover
  };
}

resetForm(): void {

  this.selectedMovieId = null;

  this.newMovie = {
    title: '',
    synopsis: '',
    year: 0,
    cover: ''
  };
}

}