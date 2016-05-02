import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import express from 'express';
import graphqlHTTP from 'express-graphql';

const regionType = new GraphQLObjectType({
  name: 'Region',
  fields: {
    id: { type : GraphQLString},
    nom: { type: GraphQLString}
  }
});

const departementType = new GraphQLObjectType({
  name: 'Departement',
  fields: {
    id: { type: GraphQLString },
    nom: { type: GraphQLString },
    region: { type: regionType}
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      departement: {
        type: departementType,
        // `args` describes the arguments that the `user` query accepts
        args: {
          id: { type: GraphQLString }
        },
        // The resolve function describes how to "resolve" or fulfill
        // the incoming query.
        // In this case we use the `id` argument from above as a key
        // to get the User from `data`
        resolve: function (_, args) {
          return {
            id: "92",
            nom: "Hauts de Seine"
          };
        }
      }
    }
  })
});

const app = express();

app
  .use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }))
  .listen(3000);

console.log('Server running at http://localhost:3000');
