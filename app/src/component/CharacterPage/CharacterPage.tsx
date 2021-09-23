import {Grid} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {RouteComponentProps} from 'react-router';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {CharacterAtom} from '../../graph/character/characterAtom';
import {BasePage} from '../BasePage/BasePage';
import {CharacterCard} from '../CharacterCard/CharacterCard';
import {ItemList} from '../ItemList/ItemList';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';
import {CharacterPageSuspenseView} from './CharacterPageSuspenseView';

type PersonViewProps = RouteComponentProps<{ id: string }>;

const CharacterPage: FunctionComponent<PersonViewProps> = ({match: {params}}) => {

    const character = useRecoilValue(CharacterAtom.character);
    useRecoilCallback(({set}) =>
        (val: string) => set(CharacterAtom.characterId, val)
    )(params.id);

    return (
        <BasePage name={character && character.name} show={Boolean(character)} card={character && (<CharacterCard character={character}/>)}>
            {character && (
                <>
                    <Grid container>
                        <ItemList items={character.films} title="Appears In"/>
                    </Grid>
                    <Grid container>
                        <ItemList items={character.starships} title="Starships"/>
                    </Grid>
                    <Grid container>
                        <ItemList items={character.species} title="Species"/>
                    </Grid>
                    <Grid container>
                        <ItemList items={character.vehicles} title="Vehicles"/>
                    </Grid>
                </>
            )}
        </BasePage>
    );

};

export default withErrorCatch(withSuspense(CharacterPage, CharacterPageSuspenseView));
