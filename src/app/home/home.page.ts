import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar,
          IonTitle, IonContent, 
          InfiniteScrollCustomEvent,
          IonList, IonItem, IonAvatar,
          IonSkeletonText, IonAlert, IonLabel, IonBadge, 
          IonInfiniteScroll, IonInfiniteScrollContent
          } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interface';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle,
    IonContent, IonList, IonItem, IonAvatar,
    IonSkeletonText, IonAlert, IonLabel, IonBadge,
    DatePipe,
    RouterModule,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ],
})
export class HomePage {

  private movieService = inject(MovieService);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] = [];
  public dummyArray = new Array(5);
  public imageBaseUrl = "https://image.tmdb.org/t/p";

  constructor() {
    this.loadMovies()
  }

  loadMovies(event? : InfiniteScrollCustomEvent) {
    this.error = null;
    if(!event) {
      this.isLoading =true;
    }
    this.movieService.getTopRatedMovies(this.currentPage)
    .pipe(finalize( ()=> {
            this.isLoading = false;
            if (event){
              event.target.complete();
            }
          }),
          catchError((err:any)=> {
            console.log(err);
            this.error = err.error.status_message;
            return[]
          })
          // ,map((res) => [])
    )
    .subscribe({
      next: (res) => {
        console.log(`Result`);
        console.log(res);
        this.movies.push(...res.results)

        if (event) {
          event.target.disabled = res.totalPages === this.currentPage;
        }
      }
    })
  }


  loadMore(event: InfiniteScrollCustomEvent) {
      this.currentPage++;
      this.loadMovies(event);
  }
}


/*
    // this.movieService.getTopRatedMovies()
    // .subscribe( (movies)=>{
    //   console.log("Hello World")
    //   console.log(movies);
    // })

    // Single Import
    // this.movieService.getMoviesDetails('872585')
    // .subscribe( (movie)=>{
    //   console.log("Movie=>")
    //   console.log(movie);
    // })

  */