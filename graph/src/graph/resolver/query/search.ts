import {EMPTY, expand, from, lastValueFrom, merge, reduce} from 'rxjs';
import {SWContext} from '../../context';
import {Query, QuerySearchArgs, Resolver, SearchResult} from '../../generated';
import {toCharacter, toFilm, toPlanet, toSpecies, toStarship, toVehicle} from '../../mappings';

export const search: Resolver<SearchResult[], Query, SWContext, QuerySearchArgs> =
    (_, {text}, {client}) =>
        lastValueFrom(
            merge(
                from(client.searchFilms(text)).pipe(
                    expand(({data}) =>
                        data.next ? client.getPage<SWAPI.ResultSet<SWAPI.Film>>(data.next) : EMPTY
                    ),
                    reduce((group, {data}) =>
                            [...group, ...data.results.map(toFilm)],
                        [] as SearchResult[]
                    ),
                ),
                from(client.searchPeople(text)).pipe(
                    expand(({data}) =>
                        data.next ? client.getPage<SWAPI.ResultSet<SWAPI.Person>>(data.next) : EMPTY
                    ),
                    reduce((group, {data}): SearchResult[] =>
                            [...group, ...data.results.map(toCharacter)],
                        [] as SearchResult[]
                    ),
                ),
                from(client.searchPlanets(text)).pipe(
                    expand(({data}) =>
                        data.next ? client.getPage<SWAPI.ResultSet<SWAPI.Planet>>(data.next) : EMPTY
                    ),
                    reduce((group, {data}): SearchResult[] =>
                            [...group, ...data.results.map(toPlanet)],
                        [] as SearchResult[]
                    ),
                ),
                from(client.searchSpecies(text)).pipe(
                    expand(({data}) =>
                        data.next ? client.getPage<SWAPI.ResultSet<SWAPI.Species>>(data.next) : EMPTY
                    ),
                    reduce((group, {data}): SearchResult[] =>
                            [...group, ...data.results.map(toSpecies)],
                        [] as SearchResult[]
                    ),
                ),
                from(client.searchStarships(text)).pipe(
                    expand(({data}) =>
                        data.next ? client.getPage<SWAPI.ResultSet<SWAPI.Starship>>(data.next) : EMPTY
                    ),
                    reduce((group, {data}): SearchResult[] =>
                            [...group, ...data.results.map(toStarship)],
                        [] as SearchResult[]
                    ),
                ),
                from(client.searchVehicles(text)).pipe(
                    expand(({data}) =>
                        data.next ? client.getPage<SWAPI.ResultSet<SWAPI.Vehicle>>(data.next) : EMPTY
                    ),
                    reduce((group, {data}): SearchResult[] =>
                            [...group, ...data.results.map(toVehicle)],
                        [] as SearchResult[]
                    ),
                )
            ).pipe(
                reduce((group, value) =>
                        [...group, ...value],
                    [] as SearchResult[]
                )
            )
        );
