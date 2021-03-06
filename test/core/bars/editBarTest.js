import Immutable, { Map, List } from 'immutable'
import { editBar } from 'core/bars'

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
        Map({name: 'test2', x: 5, y: 6, w: 7, h: 8}),
        Map({name: 'test3', x: 9, y: 10, w: 11, h: 12})
      )
    })
  )
});


describe('Core Functions', () => {
  describe('addBar', () => {
    it('Edit bar in a wall', () => {

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
                Map({name: 'test2', x: 5, y: 6, w: 7, h: 8}),
                Map({name: 'test4', x: 13, y: 14, w: 15, h: 12})
              )
            })
          )
      });

      const payload = {
        wallIndex: 1,
        barIndex: 1,
        bar: {name: 'test4', x: 13, y: 14, w: 15}
      };
      
      const iStateClone = iState;

      expect(Immutable.is(iStateTarget, editBar(iState, payload))).to.be.true;
      expect(Immutable.is(iStateClone, iState)).to.be.true;
    })
  });
});