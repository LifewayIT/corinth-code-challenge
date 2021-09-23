import {atom, selector} from 'recoil';
import {PlanetService} from './planetService';

export namespace PlanetAtom {

    export const planetId = atom<string>({
        key: 'planetId',
        default: null
    });

    export const planet = selector({
        key: 'planet',
        get: async ({get}) => {
            const id = get(planetId);
            if (id) {
                return PlanetService.getPlanetById(id);
            } else {
                return null;
            }
        }
    });

}
