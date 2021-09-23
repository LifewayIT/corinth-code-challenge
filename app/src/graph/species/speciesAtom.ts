import {atom, selector} from 'recoil';
import {SpeciesService} from "./speciesService";

export namespace SpeciesAtom {

    export const speciesId = atom<string>({
        key: 'speciesId',
        default: null
    });

    export const species = selector({
        key: 'species',
        get: async ({get}) => {
            const id = get(speciesId);
            if (id) {
                return SpeciesService.getSpeciesById(id);
            } else {
                return null;
            }
        }
    });

}
