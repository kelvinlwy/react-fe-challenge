import {connect} from 'react-redux';
import TableView from '../components/TableView';
import moment from 'moment';
import 'moment-timezone';

const mapStateToProps = (state) => {
  return {
    shifts: state.shifts
      .sort((s1, s2) => {
        return moment(s1.start_time).isSame(s2.start_time) ? 0 :
          moment(s1.start_time).isAfter(s2.start_time) ? 1 : -1;
      })
      .map(shift => {
        const duration = moment.duration(shift.break_duration, 'seconds');

        return {
          ...shift,
          start_date: moment.utc(shift.start_time).tz(state.shop.timezone).format('D MMM YYYY (ddd)'),
          start_time: moment.utc(shift.start_time).tz(state.shop.timezone).format('D MMM HH:mm'),
          end_time: moment.utc(shift.end_time).tz(state.shop.timezone).format('D MMM HH:mm'),
          break_duration: `${duration.asMinutes()} minutes`
        }
      })
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(TableView);

