import {FieldsByTypeName, parseResolveInfo} from 'graphql-parse-resolve-info';
import {from, lastValueFrom, merge, of, reduce, switchMap} from 'rxjs';
import {SWAPIClient} from '../../../swClient';
import {getFieldRelations} from '../../../util';
import {SWContext} from '../../context';
import {Character, Query, QueryGetCharacterArgs, ResolverFn} from '../../generated';
import {toCharacter, toFilm, toPlanet, toSpecies, toStarship, toVehicle} from '../../mappings';

export const getCharacterById = (id: string, client: SWAPIClient, fields: FieldsByTypeName): Promise<Character> =>
    lastValueFrom(
        from(client.getPerson(id)).pipe(
            switchMap((ch) =>
                merge(
                    of(toCharacter(ch.data)),
                    ...[
                        fields.films && getFieldRelations(client, ch.data.films, 'films', toFilm),
                        fields.starships && getFieldRelations(client, ch.data.starships, 'starships', toStarship),
                        fields.species && getFieldRelations(client, ch.data.species, 'species', toSpecies),
                        fields.vehicles && getFieldRelations(client, ch.data.vehicles, 'vehicles', toVehicle),
                        fields.homeWorld && from(client.getPage<SWAPI.Planet>(ch.data.homeworld)).pipe(
                            switchMap(({data}) =>
                                of({
                                    homeWorld: toPlanet(data)
                                } as Pick<Character, 'homeWorld'>)
                            )
                        )
                    ].filter(Boolean)
                ).pipe(
                    reduce<Character, Character>((group, value) => ({
                        ...group,
                        ...value
                    }), {} as Character)
                )
            )
        )
    );

export const getCharacter: ResolverFn<Character, Query, SWContext, QueryGetCharacterArgs> =
    async (_, {id}, {client}, info) => {

        const {fieldsByTypeName: {Character: requestedFields}} = parseResolveInfo(info);
        const fields = requestedFields as unknown as FieldsByTypeName; // solves overlap issue

        return getCharacterById(id, client, fields);
    };
