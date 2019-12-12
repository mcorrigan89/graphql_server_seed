import { ModelViewTemplate } from '@utils/view.template';
import { Context } from '@src/app/context';
import { UserModel } from './model';

export class UserView extends ModelViewTemplate<UserModel> {
  constructor(context: Context, user: UserModel) {
    super(context, user);
  }

  get username() {
    return this.data.username;
  }
}