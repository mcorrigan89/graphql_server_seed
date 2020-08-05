import { Connection, createConnection, getConnection, getConnectionOptions } from 'typeorm';

export const connectionPostgres = {
  create: async (connectionName: 'default' | 'test' = 'default'): Promise<Connection> => {
    const connectionOptions = await getConnectionOptions(connectionName);
    const connection = await createConnection({ ...connectionOptions, name: 'default' });
    return connection;
  },

  async close(): Promise<void> {
    await getConnection().close();
  },

  async clear(): Promise<void> {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    await Promise.all(
      entities.map(async entity => {
        const repository = connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      })
    );
  }
};
