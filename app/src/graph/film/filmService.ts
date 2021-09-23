import {apolloClient} from '../apolloClient';
import {FilmDetailFragment, GetFilmQuery, GetFilmQueryVariables} from '../generated';
import {getFilm} from './film.graphql';

export namespace FilmService {

    export type FilmDetail = FilmDetailFragment;

    export const getFilmById = (id: string): Promise<FilmDetail> =>
        apolloClient.query<GetFilmQuery, GetFilmQueryVariables>({
            query: getFilm,
            variables: {
                id
            }
        }).then(({data}) => data.getFilm);

}
