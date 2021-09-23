import {Container} from '@mui/material';
import React, {FunctionComponent} from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import CharacterView from '../CharacterPage/CharacterPage';
import FilmPage from '../FilmPage/FilmPage';
import {Header} from '../Header/Header';
import PlanetPage from '../PlanetPage/PlanetPage';
import SpeciesPage from '../SpeciesPage/SpeciesPage';
import StarshipPage from '../StarshipPage/StarshipPage';
import VehiclePage from '../VehiclePage/VehiclePage';

type AppProps = RouteComponentProps;

const App: FunctionComponent<AppProps> = ({match: {path}}) => (
    <>
        <Header/>
        <Container maxWidth="xl" sx={{marginTop: 10}}>
            <Switch>
                <Route path={`${path}character/:id`} component={CharacterView}/>
                <Route path={`${path}film/:id`} component={FilmPage}/>
                <Route path={`${path}planet/:id`} component={PlanetPage}/>
                <Route path={`${path}species/:id`} component={SpeciesPage}/>
                <Route path={`${path}starship/:id`} component={StarshipPage}/>
                <Route path={`${path}vehicle/:id`} component={VehiclePage}/>
            </Switch>
        </Container>
    </>
);

export default withRouter(App);

