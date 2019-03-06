import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import moment from 'moment'
import 'moment-timezone';
import ChangeShiftDialog from './ChangeShiftDialog';

const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class CalendarView extends Component {
  constructor(props) {
    super(props);

    this.handleEventDrop = this.handleEventDrop.bind(this);
    this.handleEventSelect = this.handleEventSelect.bind(this);
    this.handleEventResize = this.handleEventResize.bind(this);

    this.state = {
      open: false
    };
  }

  getStyle = (event) => {
    return {
      style: {
        backgroundColor: event.role.background_colour,
        color: event.role.text_colour
      }
    };
  };

  handleEventSelect = (event) => {

    this.setState({
      open: true,
      shiftId: event.id,
      employeeId: event.employee.id,
      dialogTitle: `Edit ${event.employee.first_name} ${event.employee.last_name} (${event.role.name}) shift`,
      startTime: moment(event.start_time).format("HH:mm"),
      endTime: moment(event.end_time).format("HH:mm"),
      startDate: moment(event.start_time).format("YYYY-MM-DD"),
      endDate: moment(event.end_time).format("YYYY-MM-DD"),
      dialogErrorMessage: ""
    });
  };

  // TODO: functional drawback of this method is that user is not able to set 'night shift' which is a shift from night time to the day time of next day.
  handleEventDrop = ({event, start, end}) => {
    let startDateTime = moment(start).format("YYYY-MM-DD HH:mm");
    let endDateTime = moment(end).format("YYYY-MM-DD HH:mm");
    startDateTime = moment.tz(startDateTime, this.props.shop.timezone);
    endDateTime = moment.tz(endDateTime, this.props.shop.timezone);

    this.props.updateShiftTime(event.id, startDateTime, endDateTime);
  };

  // TODO: functional drawback of this method is that user is not able to set 'night shift' which is a shift from night time to the day time of next day.
  handleEventResize = ({event, start, end}) => {
    let startDateTime = moment(start).format("YYYY-MM-DD HH:mm");
    let endDateTime = moment(end).format("YYYY-MM-DD HH:mm");
    startDateTime = moment.tz(startDateTime, this.props.shop.timezone);
    endDateTime = moment.tz(endDateTime, this.props.shop.timezone);

    this.props.updateShiftTime(event.id, startDateTime, endDateTime);
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleUpdateShift = (startDate, endDate, startTime, endTime) => {
    const startDateTime = moment.tz(`${startDate} ${startTime}`, this.props.shop.timezone);
    const endDateTime = moment.tz(`${endDate} ${endTime}`, this.props.shop.timezone);

    const diff = endDateTime.diff(startDateTime, 'hours', true);
    const invalidRange = startDateTime.isAfter(endDateTime);

    if (invalidRange) {
      this.setState({dialogErrorMessage: "Invalid shift"});
    } else if (diff <= 2) {
      this.setState({dialogErrorMessage: `${diff}hr${diff > 1 ? "s" : ''}!? Your employee is a hard worker!`});
    } else if (diff >= 12) {
      this.setState({dialogErrorMessage: `Don't be too harsh to your employee!`});
    } else {
      this.setState({dialogErrorMessage: ""}, () => {
        this.props.updateShiftTime(this.state.shiftId, startDateTime, endDateTime);
        this.handleClose();
      });
    }
  };

  render() {
    const {shifts, firstDateToShow} = this.props;
    const {open, dialogTitle, startDate, endDate, startTime, endTime, dialogErrorMessage} = this.state;

    return (
      <Fragment>
        <DragAndDropCalendar
          localizer={localizer}
          views={['day', 'week']}
          defaultView={'week'}
          defaultDate={firstDateToShow}
          startAccessor='start_time'
          endAccessor='end_time'
          events={shifts}
          selectable
          resizable
          popup
          showMultiDayTimes
          eventPropGetter={(this.getStyle)}
          onSelectEvent={this.handleEventSelect}
          onEventDrop={this.handleEventDrop}
          onEventResize={this.handleEventResize}
        />

        {
          open &&
          <ChangeShiftDialog
            open={open}
            dialogTitle={dialogTitle}
            startDate={startDate}
            endDate={endDate}
            startTime={startTime}
            endTime={endTime}
            handleClose={this.handleClose}
            handleUpdateShift={this.handleUpdateShift}
            dialogErrorMessage={dialogErrorMessage}
          />
        }
      </Fragment>
    );
  }
}

CalendarView.propTypes = {
  shifts: PropTypes.array.isRequired,
  firstDateToShow: PropTypes.instanceOf(Date),
  updateShiftTime: PropTypes.func.isRequired
};

export default CalendarView;
