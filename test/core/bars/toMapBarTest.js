import Immutable, { Map, List } from 'immutable'
import { toMapBar } from 'core/bars'

const bar = {
  name: 'test1',
  x: 1,
  y: 2,
  w: 3,
  h: 4,
}

describe('Core Functions', () => {
  describe('toMapBar', () => {
    it('convert bar to Map', () => {
      const iBarTarget = Map({
        name: 'test1',
        x: 1,
        y: 2,
        w: 3,
        h: 4,
      });

      expect(Immutable.is(iBarTarget, toMapBar(bar))).to.be.true;
    });
  });
});