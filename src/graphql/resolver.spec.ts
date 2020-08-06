import { createTestClient } from 'apollo-server-testing';
import { createSchema } from './graphql.config';
import { Context } from '@src/app/context';
import { ApolloServer } from 'apollo-server';
import { connectionPostgres } from '@app/setup.db';
import { getRepository } from 'typeorm';
import { UserModel } from '@data/user/model';

describe('Resolvers', () => {
  beforeAll(async () => {
    await connectionPostgres.create('test');
  });
  afterAll(async () => {
    await connectionPostgres.close();
  });

  describe('User Resolvers', () => {
    it('finds created User By Id', async () => {
      const schema = await createSchema();
      const server = new ApolloServer({
        schema,
        context: () => new Context()
      });
      const userToSave = new UserModel();
      userToSave.username = 'graph-test-user';
      userToSave.password = 'graph-test-user-password';
      userToSave.firstName = 'Testy';
      userToSave.lastName = 'McTestFace';
      const savedUser = await getRepository(UserModel).save(userToSave);

      const { query } = createTestClient(server);
      const res = await query({
        query: `query UserById($id: ID!) {
        user(id: $id) {
          username
          firstName
          lastName
        }
      }`,
        variables: { id: savedUser.id }
      });
      expect(res.data).toEqual({ user: { username: 'graph-test-user', firstName: 'Testy', lastName: 'McTestFace' } });
    });
  });
});
