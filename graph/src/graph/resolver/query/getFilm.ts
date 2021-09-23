import {FieldsByTypeName, parseResolveInfo} from 'graphql-parse-resolve-info';
import {from, lastValueFrom, merge, of, reduce, switchMap} from 'rxjs';
import {getFieldRelations} from '../../../util';
import {SWContext} from '../../context';
import {Film, Query, QueryGetFilmArgs, Resolver} from '../../generated';
import {toCharacter, toFilm, toPlanet, toSpecies, toStarship, toVehicle} from '../../mappings';

export const getFilm: Resolver<Film, Query, SWContext, QueryGetFilmArgs> =
    async (_, {id}, {client}, info) => {
        const {fieldsByTypeName: {Film: requestedFields}} = parseResolveInfo(info);
        const fields = requestedFields as unknown as FieldsByTypeName; // solves overlap issue
        return lastValueFrom(
            from(client.getFilm(id)).pipe(
                switchMap((ch) =>
                    merge(
                        of(toFilm(ch.data)),
                        ...[
                            fields.planets && getFieldRelations(client, ch.data.planets, 'planets', toPlanet),
                            fields.characters && getFieldRelations(client, ch.data.characters, 'characters', toCharacter),
                            fields.starships && getFieldRelations(client, ch.data.starships, 'starships', toStarship),
                            fields.species && getFieldRelations(client, ch.data.species, 'species', toSpecies),
                            fields.vehicles && getFieldRelations(client, ch.data.vehicles, 'vehicles', toVehicle),
                        ].filter(Boolean)
                    ).pipe(
                        reduce((group, value: Film) => ({
                            ...group,
                            ...value
                        }), {} as Film)
                    )
                )
            )
        );
    };
