const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Definición del esquema (schema) de GraphQL
const typeDefs = gql`
  type Query {
    user: String
  }
`;

// Definición de los resolvers
const resolvers = {
  Query: {
    user: () => '1, Diego, Chicaiza',
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Servidor GraphQL escuchando en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
