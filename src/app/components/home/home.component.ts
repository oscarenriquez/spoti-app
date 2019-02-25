import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nuevasCanciones = new Array<any>();
  public loading = true;
  public hasError = false;
  public mensajeError = '';
  constructor(private spotify: SpotifyService) {
  }

  ngOnInit() {
    this.spotify.getNewReleases().subscribe(data => {
      this.nuevasCanciones = data as Array<any>;
      this.loading = false;
    }, (errorServicio) => {
      this.loading = false;
      this.hasError = true;
      this.mensajeError = errorServicio.error.error.message;
    });
  }

}
