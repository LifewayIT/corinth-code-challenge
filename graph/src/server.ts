import {ApolloServer} from 'apollo-server';
import {getCharacter} from './graph/resolver/query/getCharacter';
import {getFilm} from './graph/resolver/query/getFilm';
import {getPlanet} from './graph/resolver/query/getPlanet';
import {getSpecies} from './graph/resolver/query/getSpecies';
import {getStarship} from './graph/resolver/query/getStarship';
import {getVehicle} from './graph/resolver/query/getVehicle';
import {search} from './graph/resolver/query/search';
import typeDefs from './graph/schema.graphql';
import {swapiClient} from './swClient';

const server = new ApolloServer({
    typeDefs,
    context: {
        client: swapiClient
    },
    resolvers: {
        Query: {
            getCharacter,
            getPlanet,
            getFilm,
            getSpecies,
            getStarship,
            getVehicle,
            search
        }
    },
    cors: {
        origin: '*',
        methods: ['options', 'post']
    }
});

void server.listen().then(({url}) => {
    console.info(`🚀 Server ready at ${url}`);
});
