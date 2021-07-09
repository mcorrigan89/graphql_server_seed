import 'reflect-metadata';
import { createTestClient } from 'apollo-server-testing';
import { createSchema } from './graphql.config';
import { Context } from '@app/context';
import { ApolloServer } from 'apollo-server';
import { connectionPostgres } from '@app/setup.db';
import { getRepository } from 'typeorm';
import { UserModel } from '@data/user/model';

describe('User Resolvers', () => {
  beforeAll(async () => {
    await connectionPostgres.create('test');
  });
  afterAll(async () => {
    await connectionPostgres.close();
  });

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

  it('should create a user', async () => {
    const schema = await createSchema();
    const server = new ApolloServer({
      schema,
      context: () => new Context()
    });
    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: `mutation CreateUser($username: String!, $password: String!, $firstName: String, $lastName: String) {
        createUser(payload: {
          username: $username
          password: $password,
          firstName: $firstName,
          lastName: $lastName
        }) {
          id
        }
      }`,
      variables: { username: 'myuser', password: 'password', firstName: 'Hello', lastName: 'World' }
    });
    const savedUser = await getRepository(UserModel).findOne({ id: res.data!.createUser.id });
    expect(savedUser?.username).toBe('myuser');
    expect(savedUser?.firstName).toBe('Hello');
    expect(savedUser?.lastName).toBe('World');
  });
});
