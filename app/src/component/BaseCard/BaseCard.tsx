import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import React, {FunctionComponent} from 'react';

type BaseItem = { __typename?: string; name: string; picture: string };
interface BaseCardProps<T extends BaseItem> {
    item: T;
}

export const BaseCard: FunctionComponent<BaseCardProps<any>> =
    ({item, children}) => (
        <Card sx={{width: '80%'}}>
            <CardMedia alt={(item as BaseItem).name}
                       component="img"
                       height="500"
                       image={(item as BaseItem).picture}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {(item as BaseItem).name}
                </Typography>
                {(item as BaseItem).__typename && (
                    <Typography gutterBottom variant="subtitle1" component="div">
                        {(item as BaseItem).__typename}
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    {children}
                </Typography>
            </CardContent>
        </Card>
    );
