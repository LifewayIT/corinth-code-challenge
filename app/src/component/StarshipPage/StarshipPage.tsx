import {Grid} from '@mui/material';
import React, {FunctionComponent, useEffect} from 'react';
import {RouteComponentProps} from 'react-router';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {StarshipAtom} from '../../graph/starship/starshipAtom';
import {ItemList} from '../ItemList/ItemList';
import {StarshipCard} from '../StarshipCard/StarshipCard';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';
import {StarshipPageSuspenseView} from './StarshipPageSuspenseView';
import {BasePage} from "../BasePage/BasePage";

type StarshipPageProps = RouteComponentProps<{ id: string }>;

const StarshipPage: FunctionComponent<StarshipPageProps> = ({match: {params}}) => {

    const starship = useRecoilValue(StarshipAtom.starship);
    const updateStarshipId = useRecoilCallback(({set}) =>
        (val: string) => set(StarshipAtom.starshipId, val)
    );

    useEffect(() => {
        updateStarshipId(params.id);
    }, [params.id]);

    return (
        <BasePage show={Boolean(starship)} card={starship && (<StarshipCard starship={starship}/>)}>
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
