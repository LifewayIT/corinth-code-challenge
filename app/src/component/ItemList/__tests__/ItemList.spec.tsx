import React from 'react';
import {create} from 'react-test-renderer';
import {ItemList} from '../ItemList';

describe('ItemList', () => {

    it('should render without error', () => {

        const tree = create(
            <ItemList items={[]}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

});
