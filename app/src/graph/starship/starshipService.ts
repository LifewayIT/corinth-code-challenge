import {apolloClient} from '../apolloClient';
import {GetStarshipQuery, GetStarshipQueryVariables, StarshipDetailFragment} from '../generated';
import {getStarship} from './starship.graphql';

export namespace StarshipService {

    export type StarshipDetail = StarshipDetailFragment;

    export const getStarshipById = (id: string): Promise<StarshipDetail> =>
        apolloClient.query<GetStarshipQuery, GetStarshipQueryVariables>({
            query: getStarship,
            variables: {
                id
            }
        }).then(({data}) => data.getStarship);

}
