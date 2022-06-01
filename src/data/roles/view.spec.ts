import { RolesView } from './view';
import { RolesModel } from './model';
jest.mock('../../app/context');
import { Context } from '../../app/context';

describe('RolesView', () => {
  it('should have model properties exposed', () => {
    const contextMock = new Context();
    const rolesModel = new RolesModel();
    rolesModel.id = '1';
    const roles = new RolesView(contextMock, rolesModel);
    expect(roles.id).toBe('1');
  });
});
