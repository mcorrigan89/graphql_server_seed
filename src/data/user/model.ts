import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { ModelTemplate } from '@utils/model.template';
import { RolesModel } from '@data/roles/model';

@Entity({ name: 'user' })
export class UserModel extends ModelTemplate {
  @Column('text')
  public username: string;

  @Column('text')
  public password: string;

  @Column('text', { nullable: true })
  public firstName?: string;

  @Column('text', { nullable: true })
  public lastName?: string;

  @ManyToMany(type => RolesModel, roles => roles.users)
  @JoinTable()
  public roles: Array<RolesModel>;
}
