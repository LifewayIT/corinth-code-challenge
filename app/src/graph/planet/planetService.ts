import {apolloClient} from '../apolloClient';
import {GetPlanetQuery, GetPlanetQueryVariables, PlanetDetailFragment} from '../generated';
import {getPlanet} from './planet.graphql';

export namespace PlanetService {

    export type PlanetDetail = PlanetDetailFragment;

    export const getPlanetById = (id: string): Promise<PlanetDetail> =>
        apolloClient.query<GetPlanetQuery, GetPlanetQueryVariables>({
            query: getPlanet,
            variables: {
                id
            }
        }).then(({data}) => data.getPlanet);

}
