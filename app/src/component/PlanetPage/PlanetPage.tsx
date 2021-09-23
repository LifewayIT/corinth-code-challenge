import {Grid, Slide} from '@mui/material';
import React, {FunctionComponent, useEffect} from 'react';
import {RouteComponentProps} from 'react-router';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {PlanetAtom} from '../../graph/planet/planetAtom';
import {ItemList} from '../ItemList/ItemList';
import {PlanetCard} from '../PlanetCard/PlanetCard';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';
import {PlanetPageSuspenseView} from './PlanetPageSuspenseView';

type PlanetPageProps = RouteComponentProps<{ id: string }>;

const PlanetPage: FunctionComponent<PlanetPageProps> = ({match: {params}}) => {

    const planet = useRecoilValue(PlanetAtom.planet);
    const updateFilmId = useRecoilCallback(({set}) =>
        (val: string) => set(PlanetAtom.planetId, val)
    );

    useEffect(() => {
        updateFilmId(params.id);
    }, [params.id]);

    return (
        <Grid container>
            <Slide direction="right" in={Boolean(planet)} unmountOnExit mountOnEnter>
                <Grid item>
                    {planet && (<PlanetCard planet={planet}/>)}
                </Grid>
            </Slide>
            <Slide direction="left" in={Boolean(planet)} unmountOnExit mountOnEnter>
                <Grid item>
                    {planet && (
                        <Grid container>
                            <ItemList items={planet.films} title="Appears In"/>
                        </Grid>
                    )}
                </Grid>
            </Slide>
        </Grid>
    );

};

export default withErrorCatch(withSuspense(PlanetPage, PlanetPageSuspenseView));
