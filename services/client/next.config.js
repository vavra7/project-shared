/* eslint-disable no-undef */

module.exports = {
  serverRuntimeConfig: {
    gqlNetworkUrl: process.env.GQL_NETWORK_URL || 'http://localhost:4000/graphql'
  },
  publicRuntimeConfig: {
    gqlPublicUrl: process.env.GQL_PUBLIC_URL || 'http://localhost:4000/graphql'
  }
};
