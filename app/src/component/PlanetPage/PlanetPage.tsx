import {Grid} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {RouteComponentProps} from 'react-router';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {PlanetAtom} from '../../graph/planet/planetAtom';
import {BasePage} from '../BasePage/BasePage';
import {ItemList} from '../ItemList/ItemList';
import {PlanetCard} from '../PlanetCard/PlanetCard';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';
import {PlanetPageSuspenseView} from './PlanetPageSuspenseView';

type PlanetPageProps = RouteComponentProps<{ id: string }>;

const PlanetPage: FunctionComponent<PlanetPageProps> = ({match: {params}}) => {

    const planet = useRecoilValue(PlanetAtom.planet);
    useRecoilCallback(({set}) =>
        (val: string) => set(PlanetAtom.planetId, val)
    )(params.id);

    return (
        <BasePage name={planet && planet.name} show={Boolean(planet)} card={planet && (
            <PlanetCard planet={planet}/>
        )}>
            {planet && (
                <Grid container>
                    <ItemList items={planet.films} title="Appears In"/>
                </Grid>
            )}
        </BasePage>
    );

};

export default withErrorCatch(withSuspense(PlanetPage, PlanetPageSuspenseView));
