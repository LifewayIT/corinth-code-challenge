import {Search as SearchIcon} from '@mui/icons-material';
import {alpha, AppBar, Box, InputBase, Popper, styled, Toolbar} from '@mui/material';
import React, {ChangeEvent, FunctionComponent, useEffect, useRef, useState} from 'react';
import {useRecoilCallback} from 'recoil';
import {debounceTime, EMPTY, fromEvent, switchMap} from 'rxjs';
import {SearchAtom} from '../../graph/search/searchAtom';
import HeaderSearchResults from './HeaderSearchResults';

const Search = styled('div')(({theme}) => ({
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    'marginRight': theme.spacing(2),
    'marginLeft': 0,
    'width': '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    'color': 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const Header: FunctionComponent = () => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement>(null);
    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);

    const setSearchValue = useRecoilCallback(
        ({set}) => (value: string) => set(SearchAtom.searchValue, value)
    );

    const toolbarRef = useRef();
    const searchInputRef = useRef();
    useEffect(() => {
        if (searchInputRef.current) {
            fromEvent<ChangeEvent<HTMLTextAreaElement | HTMLInputElement>>(searchInputRef.current, 'keyup').pipe(
                debounceTime(100),
                switchMap((evt) => {
                    setSearchValue(evt.target.value);
                    return EMPTY;
                })
            ).subscribe();
        }
    }, [searchInputRef]);

    useEffect(() => {
        if (toolbarRef.current) {
            setAnchorEl(toolbarRef.current);
        }
    }, [toolbarRef]);

    return (
        <AppBar position="sticky" elevation={0}>
            <Toolbar ref={toolbarRef}>
                <Box flexGrow={1}/>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{
                            value: search,
                            ref: searchInputRef,
                            ['aria-label']: 'search',
                            onFocus: () => setShowResults(true),
                            onBlur: () => setTimeout(() => setShowResults(false), 200),
                            onChange: ({target}) => setSearch(target.value),
                        }}
                    />
                    <Popper open={showResults && Boolean(anchorEl)}
                            style={{zIndex: 300}}
                            anchorEl={anchorEl}
                            placement="bottom">
                        <HeaderSearchResults/>
                    </Popper>
                </Search>
                <Box flexGrow={1}/>
            </Toolbar>
        </AppBar>
    );
};
