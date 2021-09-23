import {Grid} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {RouteComponentProps} from 'react-router';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {StarshipAtom} from '../../graph/starship/starshipAtom';
import {BasePage} from '../BasePage/BasePage';
import {ItemList} from '../ItemList/ItemList';
import {StarshipCard} from '../StarshipCard/StarshipCard';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';
import {StarshipPageSuspenseView} from './StarshipPageSuspenseView';

type StarshipPageProps = RouteComponentProps<{ id: string }>;

const StarshipPage: FunctionComponent<StarshipPageProps> = ({match: {params}}) => {

    const starship = useRecoilValue(StarshipAtom.starship);
    useRecoilCallback(({set}) =>
        (val: string) => set(StarshipAtom.starshipId, val)
    )(params.id);

    return (
        <BasePage name={starship && starship.name} show={Boolean(starship)} card={starship && (<StarshipCard starship={starship}/>)}>
            {starship && (
                <>
                    <Grid container>
                        <ItemList items={starship.films} title="Appears In"/>
                    </Grid>
                    <Grid container>
                        <ItemList items={starship.pilots} title="Pilots"/>
                    </Grid>
                </>
            )}
        </BasePage>
    );

};

export default withErrorCatch(withSuspense(StarshipPage, StarshipPageSuspenseView));
