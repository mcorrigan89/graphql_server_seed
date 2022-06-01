jest.mock('../../app/context');
import { Context } from '../../app/context';
import { RolesController } from './controller';
import { connectionPostgres } from '../../app/setup.db';
import { getRepository } from 'typeorm';
import { RolesModel } from './model';

describe('RolesController', () => {
  beforeAll(async () => {
    await connectionPostgres.create('test');
  });
  afterAll(async () => {
    await connectionPostgres.close();
  });
  it('should get a Roles by ID', async () => {
    const contextMock = new Context();
    const rolesController = new RolesController(contextMock);
    const rolesToSave = new RolesModel();
    const rolessaved = await getRepository(RolesModel).save(rolesToSave);
    const rolesView = await rolesController.getRolesById(rolessaved.id);
    expect(rolesView!.data).toEqual(rolessaved);
  });
});
