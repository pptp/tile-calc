import Immutable, { Map, List } from 'immutable'
import { cancelEditWall } from 'core/edit'

const iState = Map({
  edit: 1,
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
  describe('cancelEditWall', () => {
    it('Cancel wall edit', () => {

      const iStateTarget = Map({
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

      const payload = {};
      
      const iStateClone = iState;

      expect(Immutable.is(iStateTarget, cancelEditWall(iState, payload))).to.be.true;
      expect(Immutable.is(iStateClone, iState)).to.be.true;
    })
  });
});