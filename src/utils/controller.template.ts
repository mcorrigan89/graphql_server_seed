import DataLoader from 'dataloader';
import _ from 'lodash';


// <T> = the ModelTemplate / `typeorm` @Entity type being controlled
// <LoaderKeys> = a TypeScript `type` calling out the keys available to `loaders`
//   for DataLoader scoping purposes
//   @see the spec file for a practical example
export class ControllerTemplate<T, LoaderKeys extends string> {

  // a pool of DataLoaders, keyed by <LoaderKeys>
  //   eg. `const user = await this.loaders['byUsername'].load('uniqueUsername');`
  public loaders: Record<LoaderKeys, DataLoader<string, T>> = {} as Record<LoaderKeys, DataLoader<string, T>>;

  // a helper for integrating TypeORM and the DataLoader pool
  //   eg. `this.loaders.byId = this.wrapQueryInDataLoader(async (ids: string[]) => { ... });`
  //   @see the spec file for a practical example
  public wrapQueryInDataLoader = (query: (keys: ReadonlyArray<string>) => Promise<Array<T>>) => {
    return new DataLoader(query);
  }

  // used to reorient your TypeORM Models returned by `wrapQueryInDataLoader`
  //   so that they have a one-to-one ordering with the `ids` passed to your wrapper
  //   (a critical aspect of working with the `dataloader` paradigm)
  //   @see the spec file for a practical example
  public orderResultsByIds = (ids: ReadonlyArray<string>, results: Array<T>, identifier?: string) => {
    const resultsByIds = _.keyBy(results, identifier ? identifier : 'id');
    return ids.map(id => {
      return resultsByIds[id];
    });
  }

}
