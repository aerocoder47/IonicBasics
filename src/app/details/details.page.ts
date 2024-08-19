import { MovieService } from './../services/movie.service';
import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonButton, IonCardContent, IonContent,
          IonHeader, IonItem, IonText,
          IonTitle, IonToolbar, IonBackButton,
          IonCard, IonCardHeader, IonCardSubtitle,
          IonCardTitle, IonIcon, IonLabel,
          IonButtons} from '@ionic/angular/standalone';
import { MovieResult } from '../services/interface';
import {cashOutline, calendarOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonCard,
    IonIcon,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonItem,
    CurrencyPipe,
    DatePipe
  ]
})
export class DetailsPage implements OnInit {
  private movieService = inject(MovieService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.movieService.getMoviesDetails(movieId)
    .subscribe(
      (movie)=>{
        console.log(movie);
        this.movie.set(movie);
      }
    )

  }
  constructor() {
    addIcons({cashOutline, calendarOutline})
   }

  ngOnInit() {
  }

}
