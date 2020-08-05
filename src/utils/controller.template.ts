import DataLoader from 'dataloader';
import _ from 'lodash';

export class ControllerTemplate<T, LoaderKeys extends string> {
  public loaders: Record<LoaderKeys, DataLoader<string, T>> = {} as Record<LoaderKeys, DataLoader<string, T>>;

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
