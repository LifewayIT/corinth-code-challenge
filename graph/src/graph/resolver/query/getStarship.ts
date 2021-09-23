import {FieldsByTypeName, parseResolveInfo} from 'graphql-parse-resolve-info';
import {from, lastValueFrom, merge, of, reduce, switchMap} from 'rxjs';
import {getFieldRelations} from '../../../util';
import {SWContext} from '../../context';
import {Query, QueryGetStarshipArgs, Resolver, Starship} from '../../generated';
import {toCharacter, toFilm, toStarship} from '../../mappings';

export const getStarship: Resolver<Starship, Query, SWContext, QueryGetStarshipArgs> =
    async (_, {id}, {client}, info) => {
        const {fieldsByTypeName: {Starship: requestedFields}} = parseResolveInfo(info);
        const fields = requestedFields as unknown as FieldsByTypeName; // solves overlap issue
        return lastValueFrom(
            from(client.getStarship(id)).pipe(
                switchMap((ch) =>
                    merge(
                        of(toStarship(ch.data)),
                        ...[
                            fields.films && getFieldRelations(client, ch.data.films, 'films', toFilm),
                            fields.pilots && getFieldRelations(client, ch.data.pilots, 'pilots', toCharacter)
                        ].filter(Boolean)
                    ).pipe(
                        reduce((group, value: Starship) => ({
                            ...group,
                            ...value
                        }), {} as Starship)
                    )
                )
            )
        );
    };
