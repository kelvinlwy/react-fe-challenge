import {connect} from 'react-redux';
import TimelineView from '../components/TimelineView';
import moment from 'moment';
import 'moment-timezone';
import employees from "../assets/data/employees.json";
import React from "react";

const mapStateToProps = (state) => {
  let employeeGroups = employees.map(employee => {
    return {
      id: employee.id,
      title: `${employee.first_name} ${employee.last_name}`
    }
  });

  return {
    shop: state.shop,
    employeeGroups,
    shiftsByEmployee: state.shifts
      .map(shift => {
        const startTime = moment.utc(shift.start_time).tz(state.shop.timezone).format('HH:mm');
        const endTime = moment.utc(shift.end_time).tz(state.shop.timezone).format('HH:mm');
        const duration = moment.duration(shift.break_duration, 'seconds');

        // Mapping data to a data set with certain attributes used to render item in timeline
        return {
          id: shift.id,
          title: `${shift.role.name} ${startTime} - ${endTime} (${duration.asMinutes()}mins break)`,
          group: shift.employee.id,
          start_time: moment.utc(shift.start_time).tz(state.shop.timezone).format('x'),
          end_time: moment.utc(shift.end_time).tz(state.shop.timezone).format('x'),
          tip: `${shift.employee.first_name} ${shift.employee.last_name}`,
          bgColor: shift.role.background_colour,
          color: shift.role.text_colour,
        }
      })
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(TimelineView);

