import {CHANGE_SHIFT} from '../actions/ShiftsActions'

export default function ShiftsReducer(state = {}, action) {
  switch (action.type) {
    case CHANGE_SHIFT:
      return state.map((shift) => {
        const {id, start_time, end_time} = action.data;

        if (shift.id === id) {
          return {
            ...shift,
            start_time,
            end_time
          };
        }

        return shift;
      });

    default:
      return state;
  }
}
