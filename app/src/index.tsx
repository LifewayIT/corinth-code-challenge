import {CssBaseline, ThemeProvider} from '@mui/material';
import React from 'react';
import {render} from 'react-dom';
import {IntlProvider} from 'react-intl';
import {Router} from 'react-router';
import {RecoilRoot} from 'recoil';
import enLocale from './assets/locale/en-US.json';
import App from './component/App/App';
import {browserHistory} from './history';
import {theme} from './theme';

render((
    <Router history={browserHistory}>
        <RecoilRoot>
            <IntlProvider locale={enLocale.locale} messages={enLocale.messages}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <App/>
                </ThemeProvider>
            </IntlProvider>
        </RecoilRoot>
    </Router>
), document.getElementById('root'));
