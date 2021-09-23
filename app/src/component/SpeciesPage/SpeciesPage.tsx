import {Grid} from '@mui/material';
import React, {FunctionComponent, useEffect} from 'react';
import {RouteComponentProps} from 'react-router';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {ItemList} from '../ItemList/ItemList';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';
import {StarshipPageSuspenseView} from './StarshipPageSuspenseView';
import {BasePage} from "../BasePage/BasePage";
import {SpeciesAtom} from "../../graph/species/speciesAtom";
import {SpeciesCard} from "../SpeciesCard/SpeciesCard";

type SpeciesPageProps = RouteComponentProps<{ id: string }>;

const SpeciesPage: FunctionComponent<SpeciesPageProps> = ({match: {params}}) => {

    const species = useRecoilValue(SpeciesAtom.species);
    const updateSpeciesId = useRecoilCallback(({set}) =>
        (val: string) => set(SpeciesAtom.speciesId, val)
    );

    useEffect(() => {
        updateSpeciesId(params.id);
    }, [params.id]);

    return (
        <BasePage show={Boolean(species)} card={species && (<SpeciesCard starship={species}/>)}>
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
