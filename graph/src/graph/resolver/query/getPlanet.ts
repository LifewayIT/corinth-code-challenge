import {FieldsByTypeName, parseResolveInfo} from 'graphql-parse-resolve-info';
import {from, lastValueFrom, merge, of, reduce, switchMap} from 'rxjs';
import {getFieldRelations} from '../../../util';
import {SWContext} from '../../context';
import {Planet, Query, QueryGetPlanetArgs, Resolver} from '../../generated';
import {toFilm, toPlanet} from '../../mappings';

export const getPlanet: Resolver<Planet, Query, SWContext, QueryGetPlanetArgs> =
    async (_, {id}, {client}, info) => {
        const {fieldsByTypeName: {Planet: requestedFields}} = parseResolveInfo(info);
        const fields = requestedFields as unknown as FieldsByTypeName; // solves overlap issue
        return lastValueFrom(
            from(client.getPlanet(id)).pipe(
                switchMap((ch) =>
                    merge(
                        of(toPlanet(ch.data)),
                        ...[
                            fields.films && getFieldRelations(client, ch.data.films, 'films', toFilm)
                        ].filter(Boolean)
                    ).pipe(
                        reduce((group, value: Planet) => ({
                            ...group,
                            ...value
                        }), {} as Planet)
                    )
                )
            )
        );
    };
