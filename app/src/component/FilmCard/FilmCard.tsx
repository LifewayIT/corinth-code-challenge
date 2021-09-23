import {Grid} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {FilmService} from '../../graph/film/filmService';
import {BaseCard} from '../BaseCard/BaseCard';
import {FieldDisplay} from '../FieldDisplay/FieldDisplay';

type FilmCardProps = {
    film: FilmService.FilmDetail;
};

export const FilmCard: FunctionComponent<FilmCardProps> = ({film}) => (
    <BaseCard item={film}>
        <Grid container direction="column" spacing={1}>
            <FieldDisplay label="Episode ID" value={film.episodeId}/>
            <FieldDisplay label="Director" value={film.director}/>
            <FieldDisplay label="Producer" value={film.producer}/>
            <FieldDisplay label="Release Date" value={film.releaseDate as string}/>
            <FieldDisplay label="Opening Crawl" value={film.openingCrawl}/>
        </Grid>
    </BaseCard>
);
