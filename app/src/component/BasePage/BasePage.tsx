import React, {FunctionComponent, ReactElement} from "react";
import {Grid, Slide} from "@mui/material";

type BasePageProps = {
    show?: boolean;
    card: ReactElement;
}

export const BasePage: FunctionComponent<BasePageProps> = ({show = false, card, children}) => (
    <Grid container spacing={4} justifyContent="space-around">
        <Slide direction="right" in={show} unmountOnExit mountOnEnter>
            <Grid item xs>
                <Grid container direction="column" justifyContent="center" alignItems="center" xs>
                    {card}
                </Grid>
            </Grid>
        </Slide>
        <Slide direction="left" in={show} unmountOnExit mountOnEnter>
            <Grid item xs>
                {children}
            </Grid>
        </Slide>
    </Grid>
);
