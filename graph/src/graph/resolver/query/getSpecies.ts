import {FieldsByTypeName, parseResolveInfo} from 'graphql-parse-resolve-info';
import {from, lastValueFrom, merge, of, reduce, switchMap} from 'rxjs';
import {getFieldRelations} from '../../../util';
import {SWContext} from '../../context';
import {Character, Query, QueryGetSpeciesArgs, Resolver, Species} from '../../generated';
import {toCharacter, toFilm, toPlanet, toSpecies} from '../../mappings';

export const getSpecies: Resolver<Species, Query, SWContext, QueryGetSpeciesArgs> =
    async (_, {id}, {client}, info) => {
        const {fieldsByTypeName: {Species: requestedFields}} = parseResolveInfo(info);
        const fields = requestedFields as unknown as FieldsByTypeName; // solves overlap issue
        return lastValueFrom(
            from(client.getSpecies(id)).pipe(
                switchMap((ch) =>
                    merge(
                        of(toSpecies(ch.data)),
                        ...[
                            fields.films && getFieldRelations(client, ch.data.films, 'films', toFilm),
                            fields.people && getFieldRelations(client, ch.data.people, 'people', toCharacter),
                            fields.homeWorld && from(client.getPage<SWAPI.Planet>(ch.data.homeworld)).pipe(
                                switchMap(({data}) =>
                                    of({
                                        homeWorld: toPlanet(data)
                                    } as Pick<Character, 'homeWorld'>)
                                )
                            )
                        ].filter(Boolean)
                    ).pipe(
                        reduce((group, value: Species) => ({
                            ...group,
                            ...value
                        }), {} as Species)
                    )
                )
            )
        );
    };
