import Immutable, { Map, List } from 'immutable'
import { removeWall } from 'core/wall'

const iState = Map({
  edit: null,
  list: List.of(
    Map({
      size: Map({w: 1, h: 2}),
      bar: List.of(
        Map({name: 'test1', x: 1, y: 2, w: 3, h: 4})
      )
    }),
    Map({
      size: Map({w: 3, h: 4}),
      bar: List.of(
        Map({name: 'test2', x: 5, y: 6, w: 7, h: 8})
      )
    })
  )
});

describe('Core Functions', () => {
  describe('removeWall', () => {
    it("Remove wall", () => {
      const iStateTarget = Map({
        edit: null,
        list: List.of(
          Map({
            size: Map({w: 3, h: 4}),
            bar: List.of(
              Map({name: 'test2', x: 5, y: 6, w: 7, h: 8})
            )
          })
        )
      });

      const payload = {
        wallIndex: 0
      };
      const iStateClone = iState;      

      expect(Immutable.is(iStateTarget, removeWall(iState, payload))).to.be.true;
      expect(Immutable.is(iState, iStateClone)).to.be.true;
    })

  });
});