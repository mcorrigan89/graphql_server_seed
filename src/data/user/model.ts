import { Entity, Column, EntityRepository, EntityManager } from 'typeorm';
import { ModelTemplate } from '@utils/model.template';

@Entity({ name: 'user' })
export class UserModel extends ModelTemplate {

  @Column('text')
  public username: string;

  @Column('text')
  public password: string;
}