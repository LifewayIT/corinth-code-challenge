import {from, mergeMap, Observable, reduce} from 'rxjs';
import {SWAPIClient} from './swClient';

type ArrayKeys<T, R = any> = { [K in keyof T]: T[K] extends R[] ? K : never }[keyof T];

export const getFieldRelations =
    <GraphQLType, GraphQLFieldType, SWAPIType, Field = keyof ArrayKeys<GraphQLType, GraphQLFieldType>>(
        client: SWAPIClient,
        urls: SWAPI.Url[],
        field: keyof Field,
        mappingFunc: (val: SWAPIType) => GraphQLFieldType
    ): Observable<{ [key: string]: GraphQLFieldType[] }> =>
        from(urls).pipe(
            mergeMap((url) =>
                from(client.getPage<SWAPIType>(url))
            ),
            reduce((group: { [key: string]: GraphQLFieldType[] }, {data}) => ({
                [field]: [...group[field as string], mappingFunc(data)]
            }), {[field]: []})
        );
