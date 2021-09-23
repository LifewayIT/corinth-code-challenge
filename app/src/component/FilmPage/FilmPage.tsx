import {Grid} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {RouteComponentProps} from 'react-router';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {FilmAtom} from '../../graph/film/filmAtom';
import {FilmCard} from '../FilmCard/FilmCard';
import {ItemList} from '../ItemList/ItemList';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';
import {FilmPageSuspenseView} from './FilmPageSuspenseView';
import {BasePage} from "../BasePage/BasePage";

type FilmPageProps = RouteComponentProps<{ id: string }>;

const FilmPage: FunctionComponent<FilmPageProps> = ({match: {params}}) => {

    const film = useRecoilValue(FilmAtom.film);
    useRecoilCallback(({set}) =>
        (val: string) => set(FilmAtom.filmId, val)
    )(params.id);

    return (
        <BasePage show={Boolean(film)} card={film && (
            <FilmCard film={film}/>
        )}>
            {film && (
                <Grid container spacing={2} direction="column">
                    <Grid item xs>
                        <ItemList items={film.characters} title="Characters"/>
                    </Grid>
                    <Grid item xs>
                        <ItemList items={film.species} title="Species"/>
                    </Grid>
                    <Grid item xs>
                        <ItemList items={film.starships} title="Starships"/>
                    </Grid>
                    <Grid item xs>
                        <ItemList items={film.vehicles} title="Vehicles"/>
                    </Grid>
                </Grid>
            )}
        </BasePage>
    );

};

export default withErrorCatch(withSuspense(FilmPage, FilmPageSuspenseView));
