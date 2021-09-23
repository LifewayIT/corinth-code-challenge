import React from 'react';
import {MemoryRouter, Route} from 'react-router';
import {create} from 'react-test-renderer';
import {RecoilRoot} from 'recoil';
import FilmPage from '../FilmPage';

jest.mock('../../../graph/film/filmService', () => ({
    getFilmById: () => Promise.resolve({
        id: '3',
        name: 'Return of the Jedi',
        episodeId: 6,
        openingCrawl: 'Luke Skywalker has returned to\r\nhis home planet of Tatooine in',
        director: 'Richard Marquand',
        producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
        releaseDate: '1983-05-25',
        created: '2014-12-18T10:39:33.255000Z',
        edited: '2014-12-20T09:48:37.462000Z'
    })
}));

describe('FilmPage', () => {

    it('should change atom on page load', () => {

        const tree = create(
            <MemoryRouter>
                <RecoilRoot>
                    <Route path="*"
                           render={({match, history, location}) => (
                               <FilmPage match={{...match, params: {id: '3'}}} history={history} location={location}/>
                           )}/>
                </RecoilRoot>
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

});
