import { ModelViewTemplate } from '@utils/view.template';
import { Context } from '@app/context';
import { RolesModel } from './model';

export class RolesView extends ModelViewTemplate<RolesModel> {
  constructor(context: Context, roles: RolesModel) {
    super(context, roles);
  }

}