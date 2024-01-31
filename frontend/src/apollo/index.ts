import type { ApolloClientOptions } from '@apollo/client/core'
import { relayStylePagination } from '@apollo/client/utilities'
import { ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client/core';
import type { BootFileParams } from '@quasar/app-vite'
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

export /* async */ function getClientOptions(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  /* {app, router, ...} */ options?: Partial<BootFileParams<any>>
) {
  const httpLink = createHttpLink({
    uri:
      process.env.GRAPHQL_URI ||
      // Change to your graphql endpoint.
      'http://localhost:4000/graphql', // warren: the GRAPHQL_URI env variable is not working.
  })

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYXNrQHVuaXZlcnNhbC10dXRvcmlhbC5jb20iLCJpYXQiOjE3MDQ4Mzk2MjZ9.A1iSXfAUAOeURnKBXLf1hbtanzhlIqlosiXhPTGmLBI'
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : "",
        authorization: token
      }
    }
  });

  return <ApolloClientOptions<unknown>>Object.assign(
    // General options.
    <ApolloClientOptions<unknown>>{
      link: ApolloLink.from([errorLink, authLink, httpLink]),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              projects: relayStylePagination(),
            },
          },
        },
      }),
      connectToDevTools: true
    },

    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},

    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},

    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  )
}
