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

  searchId: number = 0;

  searchedMovie: Movie | null = null;

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
        alert('Error al cargar películas');
      }
    });
  }

  addMovie(): void {

    if (this.selectedMovieId) {

      this.movieService
        .updateMovie(this.selectedMovieId, this.newMovie)
        .subscribe({
          next: () => {

            alert('Película actualizada correctamente');

            this.loadMovies();

            this.resetForm();
          },
          error: (error) => {
            console.error(error);
            alert('Error al actualizar la película');
          }
        });

    } else {

      this.movieService
        .addMovie(this.newMovie)
        .subscribe({
          next: () => {

            alert('Película agregada correctamente');

            this.loadMovies();

            this.resetForm();
          },
          error: (error) => {
            console.error(error);
            alert('Error al agregar la película');
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

  deleteMovie(id: number): void {

    const confirmDelete = confirm('¿Deseas eliminar esta película?');

    if (!confirmDelete) return;

    this.movieService.deleteMovie(id)
      .subscribe({
        next: () => {

          alert('Película eliminada correctamente');

          this.loadMovies();
        },
        error: (error) => {
          console.error(error);
          alert('Error al eliminar la película');
        }
      });
  }

 
searchMovie(): void {

  if (!this.searchId) {
    alert('Ingresa un ID válido');
    return;
  }

  this.movieService.getMovieById(this.searchId)
    .subscribe({
      next: (movie) => {

        this.searchedMovie = movie;

        alert('Película encontrada');
      },
      error: (error) => {

        console.error(error);

        this.searchedMovie = null;

        alert('Película no encontrada');
      }
    });
}

    }