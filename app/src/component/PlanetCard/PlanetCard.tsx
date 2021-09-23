import {Grid} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {PlanetService} from '../../graph/planet/planetService';
import {BaseCard} from '../BaseCard/BaseCard';
import {FieldDisplay} from '../FieldDisplay/FieldDisplay';

type PlanetCardProps = {
    planet: PlanetService.PlanetDetail;
};

export const PlanetCard: FunctionComponent<PlanetCardProps> = ({planet}) => (
    <BaseCard item={planet}>
        <Grid container direction="column" spacing={1}>
            <FieldDisplay label="Rotation Period" value={`${planet.rotationPeriodInHours} hrs`}/>
            <FieldDisplay label="Orbital Period" value={planet.orbitalPeriod}/>
            <FieldDisplay label="Diameter" value={planet.diameter}/>
            <FieldDisplay label="Climate" value={planet.climate}/>
            <FieldDisplay label="Gravity" value={planet.gravity}/>
            <FieldDisplay label="Terrain" value={planet.terrain.join(', ')}/>
            <FieldDisplay label="Surface Water" value={planet.surfaceWater}/>
            <FieldDisplay label="Population" value={planet.population}/>
        </Grid>
    </BaseCard>
);
