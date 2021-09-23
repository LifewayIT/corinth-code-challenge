import React, {FunctionComponent} from 'react';
import splashScreen from '../../assets/image/long-time-ago.png';
import {CircularProgress, Grid, LinearProgress} from "@mui/material";

export const FilmPageSuspenseView: FunctionComponent = () => (
    <Grid container direction="column">
        <Grid item xs>
            <LinearProgress color="primary"/>
        </Grid>
        <Grid item xs>
            <img src={splashScreen} style={{width: '100%'}}/>
        </Grid>
    </Grid>
);
