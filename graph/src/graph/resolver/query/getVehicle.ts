import {FieldsByTypeName, parseResolveInfo} from 'graphql-parse-resolve-info';
import {from, lastValueFrom, merge, of, reduce, switchMap} from 'rxjs';
import {getFieldRelations} from '../../../util';
import {SWContext} from '../../context';
import {Query, QueryGetVehicleArgs, Resolver, Vehicle} from '../../generated';
import {toCharacter, toFilm, toVehicle} from '../../mappings';

export const getVehicle: Resolver<Vehicle, Query, SWContext, QueryGetVehicleArgs> =
    async (_, {id}, {client}, info) => {
        const {fieldsByTypeName: {Vehicle: requestedFields}} = parseResolveInfo(info);
        const fields = requestedFields as unknown as FieldsByTypeName; // solves overlap issue
        return lastValueFrom(
            from(client.getVehicle(id)).pipe(
                switchMap((ch) =>
                    merge(
                        of(toVehicle(ch.data)),
                        ...[
                            fields.films && getFieldRelations(client, ch.data.films, 'films', toFilm),
                            fields.pilots && getFieldRelations(client, ch.data.pilots, 'pilots', toCharacter)
                        ].filter(Boolean)
                    ).pipe(
                        reduce((group, value: Vehicle) => ({
                            ...group,
                            ...value
                        }), {} as Vehicle)
                    )
                )
            )
        );
    };
