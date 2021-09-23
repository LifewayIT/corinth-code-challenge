import {swapiClient} from '../../../../swClient';
import {getCharacterById} from '../getCharacter';
import * as luke from './luke.json';

describe('getCharacter', () => {

    it('should get character', async () => {

        const result = await getCharacterById('1', swapiClient, {});
        expect(result).toEqual(luke);

    });


});
