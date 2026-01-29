import NodeCache from 'node-cache';

export const rateCache = new NodeCache({
  stdTTL: 120,
  checkperiod: 130,
});
