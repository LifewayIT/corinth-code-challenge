import React, {FunctionComponent} from "react";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

interface BaseCardProps<T extends { __typename?: string; name: string; picture: string }> {
    item: T;
}

export const BaseCard: FunctionComponent<BaseCardProps<any>> = ({item, children}) => (
    <Card sx={{width: '80%'}}>
        <CardMedia alt={item.name}
                   component="img"
                   height="500"
                   image={item.picture}/>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.name}
            </Typography>
            {item.__typename && (
                <Typography gutterBottom variant="subtitle1" component="div">
                    {item.__typename}
                </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
                {children}
            </Typography>
        </CardContent>
    </Card>
);
