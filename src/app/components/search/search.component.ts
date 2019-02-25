import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public artistas = new Array<any>();
  public loading = false;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  buscarArtista(event) {
    const term = event.target.value;
    this.loading = true;
    this.spotifyService.getArtistas(term).subscribe(data => {
      this.artistas = data as Array<any>;
      this.loading = false;
    });
  }

}
