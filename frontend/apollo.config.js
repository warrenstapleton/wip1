/* eslint-env node */
// See https://www.apollographql.com/docs/devtools/apollo-config/
module.exports = {
  client: {
    service: {
      // name: 'my-service',
      url: 'http://localhost:4000/graphql',
      headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYXNrQHVuaXZlcnNhbC10dXRvcmlhbC5jb20iLCJpYXQiOjE3MDQ4MDIwMDJ9.nXrp_EaR4kobfgFSuq48QUjpvP3tqQoQypKp4pXXf3U'
      },
      skipSSLValidation: true
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts']
  }
};
