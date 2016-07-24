import Immutable, { Map, List } from 'immutable'
import { addWall, toMapWall, init } from 'core/wall'

const iState = Map({
  edit: null,
  list: List.of(
  )
});


describe('Core Functions', () => {
  describe('addWall', () => {
    it('Add wall To State', () => {
      const iStateTarget = Map({
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

      const payload = {
        wall: {
          size: {w: 1, h: 2},
          bar: [
            {name: 'test1', x: 1, y: 2, w: 3, h: 4}
          ]
        }
      }
      
      const iStateClone = iState;

      expect(Immutable.is(iStateTarget, addWall(iState, payload))).to.be.true;
      expect(Immutable.is(iStateClone, iState)).to.be.true;
    })
  });
});