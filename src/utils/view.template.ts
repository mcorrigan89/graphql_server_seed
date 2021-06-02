import { Context } from '@app/context';
import { ModelTemplate } from './model.template';

export class ViewTemplate<T> {
  public data: T;
  private _context: Context;

  constructor(context: Context, data: T) {
    this._context = context;
    this.data = data;
  }

  get context() {
    return this._context;
  }
}

export class ModelViewTemplate<T extends ModelTemplate> extends ViewTemplate<T> {
  get key() {
    return this.data.key;
  }

  get id() {
    return this.data.id;
  }

  get createdAt() {
    return this.data.createdAt;
  }

  get updatedAt() {
    return this.data.updatedAt;
  }
}
