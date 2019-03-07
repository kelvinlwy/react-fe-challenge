import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import moment from "moment";

class ChangeShiftDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: moment(props.shift.start_time).format("HH:mm"),
      endTime: moment(props.shift.end_time).format("HH:mm"),
      startDate: moment(props.shift.start_time).format("YYYY-MM-DD"),
      endDate: moment(props.shift.end_time).format("YYYY-MM-DD"),
      errorMessage: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleUpdateShift = () => {
    const {startDate, endDate, startTime, endTime} = this.state;
    const startDateTime = moment.tz(`${startDate} ${startTime}`, this.props.shop.timezone);
    const endDateTime = moment.tz(`${endDate} ${endTime}`, this.props.shop.timezone);

    const diff = endDateTime.diff(startDateTime, 'hours', true);
    const invalidRange = startDateTime.isAfter(endDateTime);

    if (invalidRange) {
      this.setState({errorMessage: "Invalid shift"});
    } else if (diff <= 2) {
      this.setState({errorMessage: `${diff}hr${diff > 1 ? "s" : ''}!? Your employee is a hard worker!`});
    } else if (diff >= 12) {
      this.setState({errorMessage: `Don't be too harsh to your employee!`});
    } else {
      this.setState({errorMessage: ""}, () => {
        this.props.updateShiftTime(this.props.shift.id, startDateTime, endDateTime);
        this.props.handleClose();
      });
    }
  };

  render() {
    const {open, handleClose, shift} = this.props;
    const {startTime, endTime, startDate, endDate, errorMessage} = this.state;
    const error = errorMessage && errorMessage.length > 0;

    const dialogTitle = `Edit ${shift.employee.first_name} ${shift.employee.last_name} (${shift.role.name}) shift`;

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="change-shift-dialog-title"
        open={open}
      >
        <div className={"dialog"}>
          <DialogTitle id="change-shift-dialog-title">{dialogTitle}</DialogTitle>

          <TextField
            disabled
            label="Start Date"
            defaultValue={startDate}
            margin="normal"
            variant="filled"
            fullWidth
            type={"date"}
          />

          <FormControl error={error} fullWidth>
            <InputLabel htmlFor="start-time">Start Time</InputLabel>
            <Input
              id="start-time"
              onChange={this.handleChange("startTime")}
              aria-describedby="start-time-error-text"
              value={startTime}
              type={"time"}
            />
            {
              error &&
              <FormHelperText id="start-time-error-text">{errorMessage}</FormHelperText>
            }
          </FormControl>

          <TextField
            disabled
            label="End Date"
            defaultValue={endDate}
            margin="normal"
            variant="filled"
            fullWidth
            type={"date"}
          />

          <FormControl error={error} fullWidth>
            <InputLabel htmlFor="end-time">End Time</InputLabel>
            <Input
              id="end-time"
              onChange={this.handleChange("endTime")}
              aria-describedby="end-time-error-text"
              value={endTime}
              type={"time"}
            />
            {
              error &&
              <FormHelperText id="end-time-error-text">{errorMessage}</FormHelperText>
            }
          </FormControl>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleUpdateShift}
                    color="secondary" variant="contained">
              Update
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

ChangeShiftDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateShift: PropTypes.func.isRequired,
  shift: PropTypes.object.isRequired
};

export default ChangeShiftDialog;
