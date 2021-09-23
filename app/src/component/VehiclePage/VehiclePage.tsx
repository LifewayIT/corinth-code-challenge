import {Grid} from '@mui/material';
import React, {FunctionComponent, useEffect} from 'react';
import {RouteComponentProps} from 'react-router';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {VehicleAtom} from '../../graph/vehicle/vehicleAtom';
import {ItemList} from '../ItemList/ItemList';
import {VehicleCard} from '../VehicleCard/VehicleCard';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';
import {VehiclePageSuspenseView} from './VehiclePageSuspenseView';
import {BasePage} from "../BasePage/BasePage";

type VehiclePageProps = RouteComponentProps<{ id: string }>;

const VehiclePage: FunctionComponent<VehiclePageProps> = ({match: {params}}) => {

    const vehicle = useRecoilValue(VehicleAtom.vehicle);
    const updateFilmId = useRecoilCallback(({set}) =>
        (val: string) => set(VehicleAtom.vehicleId, val)
    );

    useEffect(() => {
        updateFilmId(params.id);
    }, [params.id]);

    return (
        <BasePage show={Boolean(vehicle)} card={vehicle && (<VehicleCard vehicle={vehicle}/>)}>
            {vehicle && (
                <>
                    <Grid container>
                        <ItemList items={vehicle.films} title="Appears In"/>
                    </Grid>
                    <Grid container>
                        <ItemList items={vehicle.pilots} title="Pilots"/>
                    </Grid>
                </>
            )}
        </BasePage>
    );

};

export default withErrorCatch(withSuspense(VehiclePage, VehiclePageSuspenseView));
