import {atom, selector} from 'recoil';
import {FilmService} from './filmService';

export namespace FilmAtom {

    export const filmId = atom<string>({
        key: 'filmId',
        default: null
    });

    export const film = selector({
        key: 'film',
        get: async ({get}) => {
            const id = get(filmId);
            if (id) {
                return FilmService.getFilmById(id);
            } else {
                return null;
            }
        }
    });

}
