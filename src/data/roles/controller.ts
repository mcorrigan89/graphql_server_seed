import { ControllerTemplate } from '@utils/controller.template';
import { getManager } from 'typeorm';
import { Context } from '@app/context';
import { BadRequestError } from '@utils/errors';
import { RolesModel } from './model';
import { RolesView } from './view';

type QueryType = 'RolesById';

const query = () => getManager().createQueryBuilder(RolesModel, 'roles')

export class RolesController extends ControllerTemplate<RolesModel, QueryType> {
  constructor(context: Context) {
    super(context);
    this.loaders['RolesById'] = this.wrapQueryInDataLoader(async (ids: ReadonlyArray<string>) => {
      const roless = await query().where('roles.id in (:...ids)', { ids }).getMany();
      return this.orderResultsByIds(ids, roless);
    });
  }

  

  public getRolesById = async (id: string) => {
    const roles = await this.loaders['RolesById'].load(id);
    return roles ? new RolesView(this.context, roles) : null;
  }

  public getRolessByIds = async (ids: Array<string>) => {
    const roless = await this.loaders['RolesById'].loadMany(ids);
    return roless.map(rolesOrError => {
      if (rolesOrError instanceof Error) {
        throw new BadRequestError(rolesOrError.message)
      } else {
        return new RolesView(this.context, rolesOrError)
      }
    });
  }
}