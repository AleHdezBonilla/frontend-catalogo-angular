import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Movie {
  id?: number;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // private apiUrl = 'http://127.0.0.1:8000/api/movies';
  private apiUrl = 'https://catalogo-laravel-production.up.railway.app/api/movies';

  constructor(private http: HttpClient) {}


 
  getMovies(): Observable<Movie[]> {
  return this.http.get<Movie[]>(this.apiUrl);
}

 
  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

 
  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

 
}