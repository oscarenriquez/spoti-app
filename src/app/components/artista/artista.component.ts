import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  public artista: any;
  public tracks: any[];
  constructor(private artivatedRoute: ActivatedRoute,
              private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.artivatedRoute.params.subscribe(params => {
      console.log(params);
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  getArtista(id: string) {
    this.spotifyService.getArtista(id).subscribe(artista => {
      this.artista = artista;
    });
  }

  getTopTracks(id: string) {
    this.spotifyService.getTopTracks(id).subscribe(topTracks => {
      this.tracks = topTracks;
    });
  }

}
