import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId = 'ff4eee38244f40a8ab9350482dbe8926';
  private clientSecret = '61c97f5f416c4fca959edf7bba4c826e';
  private token = 'BQBrNn--0CW_4cgoBX4f5cnOFU-inbjLcAuNh20eorkEqfw_WQr0A3VHiEELxpzTut2TpNPNw1VGcUaMsSc';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
    // this.getToken();
  }

  private getQuery(url): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`https://api.spotify.com/v1/${url}`, this.httpOptions );
  }

  getNewReleases(): Observable<any> {
    return this.getQuery('browse/new-releases?country=SE&limit=20&offset=0')
                .pipe(map( data => data.albums.items ));
  }

  getArtistas(term: string): Observable<any> {
    return this.getQuery(`search?q=${term}&type=artist&limit=15`)
        .pipe(map( data =>  data.artists.items ));
  }

  getArtista(id: string): Observable<any> {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string): Observable<any> {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map(data => data.tracks)
    );
  }

  private getToken(): void {
    const clientCredentials = this.utf8_to_b64(`${this.clientId}:${this.clientSecret}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':  'http://localhost:4200/',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        Authorization: `Basic ${clientCredentials}`
      }),
      params: new HttpParams()
              .set('grant_type', 'client_credentials')
              .set('client_id', this.clientId)
              .set('client_secret', this.clientSecret)
    };
    this.http.post<any>('https://accounts.spotify.com/api/token', httpOptions).subscribe(data => {
      this.token = data.access_token;
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${data.access_token}`);
    });
  }

  utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
  }

  b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
  }
}
