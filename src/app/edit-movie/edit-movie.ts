import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Movie } from '../models/movie';

import { MoviesService } from '../services/movies';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-movie.html',
  styleUrls: ['./edit-movie.css']
})

export class EditMovieComponent implements OnInit {

  movie: Movie = {
    title: '',
    synopsis: '',
    year: 0,
    cover: '',
    trailer: ''
  };

  movieId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {

    this.movieId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.movieService
      .getMovieById(this.movieId)
      .subscribe({

        next: (data) => {
          this.movie = data;
        }

      });

  }

  updateMovie(): void {

    this.movieService
      .updateMovie(this.movieId, this.movie)
      .subscribe({

        next: () => {

          alert('Película actualizada');

          this.router.navigate(['/movies']);

        }

      });

  }

}