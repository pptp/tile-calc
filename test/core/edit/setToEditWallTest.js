import Immutable, { Map, List } from 'immutable'
import { setToEditWall } from 'core/edit'

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
  describe('setToEditWall', () => {
    it('Set editable wall', () => {

      const iStateTarget = Map({
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

      const payload = {
        wallIndex: 1,
      };
      
      const iStateClone = iState;

      expect(Immutable.is(iStateTarget, setToEditWall(iState, payload))).to.be.true;
      expect(Immutable.is(iStateClone, iState)).to.be.true;
    })
  });
});