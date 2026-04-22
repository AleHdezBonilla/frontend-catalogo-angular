import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../services/movies';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies implements OnInit {

  movies: any[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }
}