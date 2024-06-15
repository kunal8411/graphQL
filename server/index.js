const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const { default: axios } = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type Todo{
          id:ID!,
          title: String!,
          completed:Boolean
        }
        type Query{
            getTodos:[Todo]
        }
    `,
    resolvers: {
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(3000, () => {
    console.log("server is running on port: 3000");
  });
}

startServer();

//Anything to be fetched from graphQL , we use query
// ?anything to post/give to graphql use mutation
