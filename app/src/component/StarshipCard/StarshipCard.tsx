import React, {FunctionComponent} from 'react';
import {StarshipService} from '../../graph/starship/starshipService';
import {BaseCard} from "../BaseCard/BaseCard";
import {FieldDisplay} from "../FieldDisplay/FieldDisplay";

type StarshipCardProps = {
    starship: StarshipService.StarshipDetail;
};

export const StarshipCard: FunctionComponent<StarshipCardProps> =
    ({starship}) => (
        <BaseCard item={starship}>
            <Grid container direction="column" spacing={1}>
                <FieldDisplay label="Model" value={starship.model}/>
                <FieldDisplay label="Manufacturer" value={starship.manufacturer}/>
                <FieldDisplay label="Cost (in Credits)" value={starship.costInCredits}/>
                <FieldDisplay label="Length" value={starship.length}/>
                <FieldDisplay label="Max Atmosphering Speed" value={starship.maxAtmospheringSpeed}/>
                <FieldDisplay label="Crew" value={starship.crew}/>
                <FieldDisplay label="Passengers" value={starship.passengers}/>
                <FieldDisplay label="Cargo Capacity" value={starship.cargoCapacity}/>
                <FieldDisplay label="Consumables" value={starship.consumables}/>
                <FieldDisplay label="Hyperdrive Rating" value={starship.hyperdriveRating}/>
                <FieldDisplay label="MGLT" value={starship.MGLT}/>
                <FieldDisplay label="Starship Class" value={starship.starshipClass}/>
            </Grid>
        </BaseCard>
    );
