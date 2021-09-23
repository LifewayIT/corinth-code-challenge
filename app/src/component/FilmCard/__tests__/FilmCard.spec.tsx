import React from 'react';
import {create} from 'react-test-renderer';
import {Film} from '../../../graph/generated';
import {FilmCard} from '../FilmCard';

describe('FilmCard', () => {

    it('should render correctly', () => {

        const film: Film = {
            id: '3',
            name: 'Return of the Jedi',
            episodeId: 6,
            openingCrawl: 'Luke Skywalker has returned to\r\nhis home planet of Tatooine in',
            director: 'Richard Marquand',
            producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
            releaseDate: '1983-05-25',
            created: '2014-12-18T10:39:33.255000Z',
            edited: '2014-12-20T09:48:37.462000Z'
        };

        const tree = create(
            <FilmCard film={film}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

});
