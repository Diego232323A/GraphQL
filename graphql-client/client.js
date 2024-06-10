const express = require('express');
const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client/core');
const fetch = require('cross-fetch');

const app = express();
const PORT = 3000;

// Configuración del cliente Apollo
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql', fetch }),
  cache: new InMemoryCache(),
});

// Configurar EJS como el motor de plantillas
app.set('view engine', 'ejs');

// Ruta principal
app.get('/', async (req, res) => {
  try {
    // Consulta GraphQL
    const query = gql`
      query {
        user
      }
    `;

    // Realizar la consulta y manejar la respuesta
    const response = await client.query({ query });
    const message = response.data.user;

    // Renderizar la respuesta en una página EJS
    res.render('index', { message, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener datos de GraphQL');
  }
});

// Iniciar el servidor Express
app.listen(PORT, () => {
  console.log(`Cliente escuchando en http://localhost:${PORT}`);
});
