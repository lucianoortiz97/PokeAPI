import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PokeAPI';
  pokemonList: any[] = [];  // Lista de pokemons con detalles

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=10')
      .subscribe((response: any) => {
        const pokemonResults = response.results;
        
        // Recorre y obtiene información adicional
        pokemonResults.forEach((pokemon: any) => {
          this.http.get(pokemon.url).subscribe((pokemonDetails: any) => {
            this.pokemonList.push({
              name: pokemonDetails.name,
              image: pokemonDetails.sprites.front_default,  
              types: pokemonDetails.types.map((t: any) => t.type.name), 
              abilities: pokemonDetails.abilities.map((a: any) => a.ability.name), 
              gender: pokemonDetails.gender_rate === -1 ? 'Unknown' : pokemonDetails.gender_rate > 4 ? 'Female' : 'Male'
            });
          });
        });
      });
  }
}
