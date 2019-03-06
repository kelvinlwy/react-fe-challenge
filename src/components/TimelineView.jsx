import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timeline from 'react-calendar-timeline';
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import 'moment-timezone';

class TimelineView extends Component {
  render() {
    const {shiftsByEmployee, employeeGroups, shop} = this.props;

    return (
      <Timeline
        groups={employeeGroups}
        items={shiftsByEmployee}
        defaultTimeStart={moment(shiftsByEmployee[0].start_time, 'x').tz(shop.timezone)}
        defaultTimeEnd={moment(shiftsByEmployee[0].start_time, 'x').tz(shop.timezone).add('12', 'h')}
        sidebarContent={<span>Employees</span>}
        traditionalZoom={true}
        canMove={true}
        canResize={"both"}
        fullUpdate
      />
    );
  }
}

TimelineView.propTypes = {
  employeeGroups: PropTypes.array.isRequired,
  shiftsByEmployee: PropTypes.array.isRequired
};

export default TimelineView;
