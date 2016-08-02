import { Map, List } from 'immutable'

export function init() {
  return Map({
    edit: null,
    list: List.of(
      Map({ id: 1,
        size: Map({w: 50, h: 100})
      }),
      Map({ id: 2, 
        size: Map({w: 100, h: 100})
      })
    )
  });

}