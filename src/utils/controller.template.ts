import DataLoader from 'dataloader';
import _ from 'lodash';
import { Context } from '@app/context';

export class ControllerTemplate<T, LoaderKeys extends string> {
  public loaders: Record<LoaderKeys, DataLoader<string, T>> = {} as Record<LoaderKeys, DataLoader<string, T>>;
  private _context: Context;

  constructor(context: Context) {
    this._context = context;
  }

  get context() {
    return this._context;
  }

  public wrapQueryInDataLoader = (query: (keys: ReadonlyArray<string>) => Promise<Array<T>>) => {
    return new DataLoader(query);
  };

  public orderResultsByIds = (ids: ReadonlyArray<string>, results: Array<T>, identifier?: string) => {
    const resultsByIds = _.keyBy(results, identifier ? identifier : 'id');
    return ids.map(id => {
      return resultsByIds[id];
    });
  };
}
