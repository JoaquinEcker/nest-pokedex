import { Injectable } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
// import { PokemonModule } from 'src/pokemon/pokemon.module';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  // Esta linea se lleva al axios.adapter
  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    // Primero borramos lo que haya guardado para que no se repitan los registros y tire error de db
    await this.pokemonModel.deleteMany({}); // Seria un delete * from pokemons;

    // Sin el adapter seria asi, usando axios directamente
    // const { data } = await this.axios.get<PokeResponse>(
    //   'https://pokeapi.co/api/v2/pokemon?limit=650',
    // );

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // Opcion 1:

    // const insertPromisesArray: Promise[] = [];

    // data.results.forEach(({ name, url }) => {
    //   const segments = url.split('/');

    //   const no: number = +segments[segments.length - 2];

    //   insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    // });

    // Opcion 2:

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');

      const no: number = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert); // insert into pokemons (name, no)

    return 'Seed executed';
  }
}
