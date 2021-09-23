import {atom, selector} from 'recoil';
import {CharacterService} from './characterService';

export namespace CharacterAtom {

    export const characterId = atom<string>({
        key: 'characterId',
        default: null
    });

    export const character = selector({
        key: 'character',
        get: async ({get}) => {
            const id = get(characterId);
            if (id) {
                return CharacterService.getCharacterById(id);
            } else {
                return null;
            }
        }
    });

}
