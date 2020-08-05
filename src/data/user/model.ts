import { Entity, Column } from 'typeorm';
import { ModelTemplate } from '@utils/model.template';

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
}
