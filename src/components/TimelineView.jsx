import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timeline from 'react-calendar-timeline';
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import 'moment-timezone';

class TimelineView extends Component {
  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state;

    // const group = groups[newGroupOrder];
    //
    // this.setState({
    //   items: items.map(item =>
    //     item.id === itemId
    //       ? Object.assign({}, item, {
    //         start: dragTime,
    //         end: dragTime + (item.end - item.start),
    //         group: group.id
    //       })
    //       : item
    //   )
    // });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    // this.setState({
    //   items: items.map(item =>
    //     item.id === itemId
    //       ? Object.assign({}, item, {
    //         start: edge === "left" ? time : item.start,
    //         end: edge === "left" ? item.end : time
    //       })
    //       : item
    //   )
    // });

    console.log("Resized", itemId, time, edge);
  };

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
