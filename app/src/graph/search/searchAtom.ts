import {isEmpty} from 'lodash';
import {atom, selector} from 'recoil';
import {SearchService} from './searchService';

export namespace SearchAtom {

    export const searchValue = atom<string>({
        key: 'searchValue',
        default: null
    });

    export const searchResults = selector({
        key: 'searchResults',
        get: async ({get}) => {

            const text = get(searchValue);
            const results = (!isEmpty(text) && text.length >= 2) ? await SearchService.search(text) : [];

            return {
                results
            };

        }
    });

}
