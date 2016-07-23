import { Map, List }, Immutable from 'immutable'
import { addWall, toMapWall, init } from 'core/wall'

describe('Core Functions', () => {
  describe('addWall', () => {
    const iState1 = Map({
      edit: null,
      list: List.of(
        Map({
          size: Map({w: 1, h: 2}),
          bar: List.of(
            Map({name: 'test1', x: 1, y: 2, w: 3, h: 4})
          )
        })
      )
    });
    const iState2 = Map({
      edit: null,
      list: List.of(
        Map({
          size: Map({w: 1, h: 2}),
          bar: List.of(
            Map({name: 'test1', x: 1, y: 2, w: 3, h: 4})
          )
        })
      )
    });
    const wall = {
      size: {w: 1, h: 2},
      bar: [
        {name: 'test1', x: 1, y: 2, w: 3, h: 4}
      ]
    };
    expect(Immutable.is(iState1, addWall(iState2, wall)))
  });
});