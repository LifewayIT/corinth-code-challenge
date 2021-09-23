import {Avatar, List, ListItem, ListItemAvatar, ListItemText, ListSubheader} from '@mui/material';
import {isEmpty} from 'lodash';
import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {toResourceUrl} from '../../util/data';

type GraphQLType = {
    __typename?: string;
    name: string;
    picture?: string;
    id: string;
};

interface ItemListProps<T extends GraphQLType> {
    items: T[];
    showType?: boolean;
    title?: string;
}

export const ItemList =
    <T extends GraphQLType>({items, showType = false, title}: ItemListProps<T>): ReactElement =>
        !isEmpty(items) ? (
            <List dense
                  sx={{
                      'width': '100%',
                      'maxWidth': 360,
                      'bgcolor': 'background.paper',
                      'position': 'relative',
                      'overflow': 'auto',
                      'maxHeight': 200,
                      '& ul': {padding: 0},
                  }}
                  subheader={title && (
                      <ListSubheader component="div" id="nested-list-subheader" color="primary">
                          {title}
                      </ListSubheader>
                  )}>
                {items.map((value) => (
                    <Link to={{
                        pathname: toResourceUrl(value)
                    }} key={`search-result-${value.id}`}>
                        <ListItem button dense>
                            <ListItemAvatar>
                                <Avatar src={value.picture}/>
                            </ListItemAvatar>
                            <ListItemText primary={value.name}
                                          secondary={showType && value.__typename}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
        ) : (<></>);
