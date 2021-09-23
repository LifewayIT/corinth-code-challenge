import {apolloClient} from '../apolloClient';
import {CharacterDetailFragment, GetCharacterQuery, GetCharacterQueryVariables} from '../generated';
import {getCharacter} from './character.graphql';

export namespace CharacterService {

    export type CharacterDetail = CharacterDetailFragment;

    export const getCharacterById = (id: string): Promise<CharacterDetail> =>
        apolloClient.query<GetCharacterQuery, GetCharacterQueryVariables>({
            query: getCharacter,
            variables: {
                id
            }
        }).then(({data}) => data.getCharacter);

}
