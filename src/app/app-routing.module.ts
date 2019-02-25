import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistaComponent } from './components/artista/artista.component';

const routes: Routes = [{
  path: 'home', component: HomeComponent,
}, {
  path: 'search', component: SearchComponent
}, {
  path: 'artist/:id', component: ArtistaComponent
}, {
  path: '**', component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
