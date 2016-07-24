import Immutable, { Map, List } from 'immutable'
import { toMapWall, init } from 'core/wall'

  describe('Core Functions', () => {
  describe('toMapWall', () => {
    it('convert wall to Map', () => {
      const wall = {
        size: {w: 1, h: 2},
        bar: [
          {name: 'test1', x: 1, y: 2, w: 3, h: 4},
          {name: 'test2', x: 5, y: 6, w: 7, h: 8}
        ]
      }
      const iWall = Map({
        size: Map({w: 1, h: 2}),
        bar: List.of(
          Map({name: 'test1', x: 1, y: 2, w: 3, h: 4}),
          Map({name: 'test2', x: 5, y: 6, w: 7, h: 8})
        )
      });

      expect(Immutable.is(iWall, toMapWall(wall))).to.be.true;
    });

    it('convert wall to Map with empty bars', () => {
      const wall = {
        size: {w: 1, h: 2},
        bar: []
      }
      const iWall = Map({
        size: Map({w: 1, h: 2}),
        bar: List.of()
      });
      expect(Immutable.is(iWall, toMapWall(wall))).to.be.true;
    });
  });
});