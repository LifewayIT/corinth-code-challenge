import {CircularProgress, Paper} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {useRecoilValue} from 'recoil';
import {SearchAtom} from '../../graph/search/searchAtom';
import {ItemList} from '../ItemList/ItemList';
import {withErrorCatch} from '../withErrorCatch';
import {withSuspense} from '../withSuspense';

export const HeaderSearchResults: FunctionComponent = () => {

    const searchResults = useRecoilValue(SearchAtom.searchResults);

    return (
        <Paper square sx={{zIndex: 1000, width: 300}}>
            <ItemList items={searchResults && searchResults.results} showType/>
        </Paper>
    );

};

export default withErrorCatch(withSuspense(HeaderSearchResults, () => (
    <Paper sx={{zIndex: 1000, width: 300}}>
        <CircularProgress size={25}/>
    </Paper>
)));
