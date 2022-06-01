import { Entity, ManyToMany } from 'typeorm';
import { ModelTemplate } from '@utils/model.template';
import { UserModel } from '@data/user/model';

@Entity()
export class RolesModel extends ModelTemplate {
    @ManyToMany(type => UserModel, user => user.roles)
    public users: Array<UserModel>;
}