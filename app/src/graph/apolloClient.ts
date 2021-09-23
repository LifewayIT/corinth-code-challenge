import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {GraphQLError} from 'graphql';
import {Config} from '../util/config';
import introspection from './introspection';

const requestLink = createHttpLink({
    uri: Config.getGraphQLEndpoint()
});

type AppSyncError = GraphQLError & {
    errorType: string;
};

const errorLink = onError(
    ({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
            (graphQLErrors as AppSyncError[]).forEach(() => {
                // TODO: handle specific errors
            });
        } else if (networkError) {
            // TODO: do something
        }
    }
);

export const apolloCache = new InMemoryCache({
    possibleTypes: introspection.possibleTypes,
    addTypename: true
});

// assemble and export the client
export const apolloClient = new ApolloClient<NormalizedCacheObject>({
    cache: apolloCache,
    link: ApolloLink.from([
        errorLink,
        requestLink
    ]),
    defaultOptions: {}
});
