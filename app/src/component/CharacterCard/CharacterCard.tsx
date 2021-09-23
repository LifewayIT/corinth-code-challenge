import React, {FunctionComponent} from 'react';
import {CharacterService} from '../../graph/character/characterService';
import {BaseCard} from "../BaseCard/BaseCard";
import {FieldDisplay} from "../FieldDisplay/FieldDisplay";

type CharacterCardProps = {
    character: CharacterService.CharacterDetail;
};

export const CharacterCard: FunctionComponent<CharacterCardProps> = ({character}) => (
    <BaseCard item={character}>
        <FieldDisplay label="Gender" value={character.gender}/>
        <FieldDisplay label="Birth Year" value={character.birthYear}/>
        <FieldDisplay label="Eye Color" value={character.eyeColor}/>
        <FieldDisplay label="Hair Color" value={character.hairColor}/>
        <FieldDisplay label="Height" value={`${character.height} cm`}/>
        {/*<FieldDisplay label="Home World" value={character.homeWorld}/>*/}
        <FieldDisplay label="Mass" value={`${character.mass} kg`}/>
        <FieldDisplay label="Skin Color" value={character.skinColor}/>
    </BaseCard>
);
