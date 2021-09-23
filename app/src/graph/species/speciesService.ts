import {apolloClient} from "../apolloClient";
import {GetSpeciesQuery, GetSpeciesQueryVariables, SpeciesDetailFragment} from "../generated";
import {getSpecies} from './species.graphql';

export namespace SpeciesService {

    export type SpeciesDetail = SpeciesDetailFragment;

    export const getSpeciesById = (id: string) =>
        apolloClient.query<GetSpeciesQuery, GetSpeciesQueryVariables>({
            query: getSpecies,
            variables: {
                id
            }
        }).then(({data}) => data.getSpecies);

}
