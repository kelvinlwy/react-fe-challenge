export const CHANGE_SHIFT = 'CHANGE_SHIFT';

export const changeShiftTime = (shiftId, startTime, endTime) => {
  return dispatch => {
    dispatch({
      type: CHANGE_SHIFT,
      data: {
        id: shiftId,
        start_time: startTime,
        end_time: endTime
      }
    });
  };
};
