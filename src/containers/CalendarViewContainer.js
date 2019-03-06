import {connect} from 'react-redux';
import CalendarView from '../components/CalendarView';
import moment from "moment";
import {changeShiftTime} from '../actions/ShiftsActions';

const mapStateToProps = (state) => {
  const shifts = state.shifts
    .sort((s1, s2) => {
      return moment(s1.start_time).isSame(s2.start_time) ? 0 :
        moment(s1.start_time).isAfter(s2.start_time) ? 1 : -1;
    })
    .map(shift => {
      const start = moment.utc(shift.start_time).tz(state.shop.timezone);
      const end = moment.utc(shift.end_time).tz(state.shop.timezone);
      const duration = moment.duration(shift.break_duration, 'seconds');

      return {
        ...shift,
        title: `${shift.role.name} - ${shift.employee.first_name} ${shift.employee.last_name} (${duration.asMinutes()}mins break)`,
        start_time: new Date(start.format('LLL')),
        end_time: new Date(end.format('LLL'))
      }
    });

  const firstDateToShow = shifts.length === 0 ? new Date() : new Date(shifts[0].start_time);

  return {
    shifts,
    firstDateToShow,
    shop: state.shop
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShiftTime: (shiftId, startTime, endTime) => {
      dispatch(changeShiftTime(shiftId, startTime, endTime));
    }
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(CalendarView);

