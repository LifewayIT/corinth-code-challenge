import {Grid} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {RouteComponentProps} from 'react-router';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {SpeciesAtom} from '../../graph/species/speciesAtom';
import {BasePage} from '../BasePage/BasePage';
import {ItemList} from '../ItemList/ItemList';
import {SpeciesCard} from '../SpeciesCard/SpeciesCard';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';
import {StarshipPageSuspenseView} from './StarshipPageSuspenseView';

type SpeciesPageProps = RouteComponentProps<{ id: string }>;

const SpeciesPage: FunctionComponent<SpeciesPageProps> = ({match: {params}}) => {

    const species = useRecoilValue(SpeciesAtom.species);
    useRecoilCallback(({set}) =>
        (val: string) => set(SpeciesAtom.speciesId, val)
    )(params.id);

    return (
        <BasePage name={species && species.name} show={Boolean(species)} card={species && (<SpeciesCard species={species}/>)}>
            {species && (
                <>
                    <Grid container>
                        <ItemList items={species.films} title="Appears In"/>
                    </Grid>
                    <Grid container>
                        <ItemList items={species.people} title="Characters"/>
                    </Grid>
                </>
            )}
        </BasePage>
    );

};

export default withErrorCatch(withSuspense(SpeciesPage, StarshipPageSuspenseView));
