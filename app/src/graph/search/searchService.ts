import {apolloClient} from '../apolloClient';
import {SearchQuery, SearchQueryVariables} from '../generated';
import {search as searchQuery} from './search.graphql';

export namespace SearchService {

    export type SearchResult = SearchQuery['search'];

    export const search = (txt: string): Promise<SearchResult> =>
        apolloClient.query<SearchQuery, SearchQueryVariables>({
            query: searchQuery,
            variables: {
                txt
            }
        }).then(({data}) => data.search);

}
