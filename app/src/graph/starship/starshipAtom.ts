import {atom, selector} from 'recoil';
import {StarshipService} from './starshipService';

export namespace StarshipAtom {

    export const starshipId = atom<string>({
        key: 'starshipId',
        default: null
    });

    export const starship = selector({
        key: 'starship',
        get: async ({get}) => {
            const id = get(starshipId);
            if (id) {
                return StarshipService.getStarshipById(id);
            } else {
                return null;
            }
        }
    });

}
