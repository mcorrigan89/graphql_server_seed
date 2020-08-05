import { createTestClient } from 'apollo-server-testing';
import { createSchema } from './graphql.config';
import { Context } from '@src/app/context';
import { ApolloServer } from 'apollo-server';

it('fetches single launch', async () => {
  //   const userAPI = new UserAPI({ store });
  //   const launchAPI = new LaunchAPI();

  // create a test server to test against, using our production typeDefs,
  // resolvers, and dataSources.
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
    context: () => new Context()
  });

  // use the test server to create a query function
  const { query } = createTestClient(server);

  // run query against the server and snapshot the output
  const res = await query({ query: '{ me { id } }', variables: { id: 1 } });
  expect(res).toMatchSnapshot();
});
