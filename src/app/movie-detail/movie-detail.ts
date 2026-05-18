import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies';
import { from } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 
 

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css']
})

export class MovieDetailComponent implements OnInit {

  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService, 
    private sanitizer: DomSanitizer
  ) {}


  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
      console.log(id);

    this.movieService.getMovieById(id)
      .subscribe({
        next: (data) => {
          this.movie = data;
        },

        
        error: (error) => {
          console.error(error);
          alert('Película no encontrada');
        }
      });

  }


getYoutubeEmbed(url?: string): SafeResourceUrl {

  if (!url || !url.includes('v=')) {

    return this.sanitizer.bypassSecurityTrustResourceUrl('');

  }

  const videoId = url.split('v=')[1].split('&')[0];

  const embedUrl =
    `https://www.youtube.com/embed/${videoId}`;

  return this.sanitizer
    .bypassSecurityTrustResourceUrl(embedUrl);
}



  deleteMovie(id: number): void {

  const confirmacion = confirm(
    '¿Deseas eliminar esta película?'
  );

  if(confirmacion){

    this.movieService.deleteMovie(id)
      .subscribe({

        next: () => {

          alert('Película eliminada');

          this.router.navigate(['/movies']);

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}

}