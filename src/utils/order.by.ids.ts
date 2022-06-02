import { keyBy } from 'lodash';

export const orderResultsByIds = <T>(ids: readonly string[] | readonly number[], results: Array<T>, jsonPath?: string): Array<T> => {
  const resultsByIds = keyBy(results, jsonPath ? jsonPath : 'id');
  return ids.map(id => resultsByIds[id]);
};
