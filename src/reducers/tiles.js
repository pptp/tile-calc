import { List, Map } from 'immutable';

const initialState = List.of(
  Map({ w: 50, h: 100 }),
  Map({ w: 100, h: 100 })
)

export default function tiles(state = initialState, action) {
  return state;
}