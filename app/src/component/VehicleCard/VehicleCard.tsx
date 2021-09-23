import {Grid} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {VehicleService} from '../../graph/vehicle/vehicleService';
import {BaseCard} from '../BaseCard/BaseCard';
import {FieldDisplay} from '../FieldDisplay/FieldDisplay';

type VehicleCardProps = {
    vehicle: VehicleService.VehicleDetail;
};

export const VehicleCard: FunctionComponent<VehicleCardProps> = ({vehicle}) => (
    <BaseCard item={vehicle}>
        <Grid container direction="column" spacing={1}>
            <FieldDisplay label="Cargo Capacity" value={vehicle.cargoCapacity}/>
            <FieldDisplay label="Consumables" value={vehicle.consumables}/>
            <FieldDisplay label="Cost (in Credits)" value={vehicle.costInCredits}/>
            <FieldDisplay label="Crew" value={vehicle.crew}/>
            <FieldDisplay label="Length" value={vehicle.length}/>
            <FieldDisplay label="Manufacturer" value={vehicle.manufacturer}/>
            <FieldDisplay label="Max Atmospehring Speed" value={vehicle.maxAtmospheringSpeed}/>
            <FieldDisplay label="Model" value={vehicle.model}/>
            <FieldDisplay label="Passengers" value={vehicle.passengers}/>
            <FieldDisplay label="Vehicle Class" value={vehicle.vehicleClass}/>
        </Grid>
    </BaseCard>
);
