import React, {FunctionComponent} from "react";
import {Grid} from "@mui/material";

type FieldDisplayProps = {
    label: string;
    value: string | number;
}

export const FieldDisplay: FunctionComponent<FieldDisplayProps> = ({label, value}) => {
    return (
        <Grid container direction="row">
            <Grid item xs={4}>
                <strong>{label}:</strong>
            </Grid>
            <Grid item xs>
                {value}
            </Grid>
        </Grid>
    )
};
