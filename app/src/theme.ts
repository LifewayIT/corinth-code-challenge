import {createTheme} from '@mui/material';
import {blueGrey} from '@mui/material/colors';

export const important = <T extends string>(value: T): T => `${value} !important` as T;

export const theme = createTheme({
    palette: {
        primary: {
            ...blueGrey
        },
        secondary: {
            main: '#fff',
            contrastText: blueGrey['500']
        }
    }
});
