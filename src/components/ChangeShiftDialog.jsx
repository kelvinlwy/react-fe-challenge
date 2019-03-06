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

class ChangeShiftDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start_time: props.startTime,
      end_time: props.endTime
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {open, dialogTitle, startDate, endDate, handleClose, dialogErrorMessage} = this.props;
    const {start_time, end_time} = this.state;
    const error = dialogErrorMessage && dialogErrorMessage.length > 0;

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
              onChange={this.handleChange("start_time")}
              aria-describedby="start-time-error-text"
              value={start_time}
              name={"start_time"}
            />
            {
              error &&
              <FormHelperText id="start-time-error-text">{dialogErrorMessage}</FormHelperText>
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
              onChange={this.handleChange("end_time")}
              aria-describedby="end-time-error-text"
              value={end_time}
              name={"end_time"}
            />
            {
              error &&
              <FormHelperText id="end-time-error-text">{dialogErrorMessage}</FormHelperText>
            }
          </FormControl>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.props.handleUpdateShift(startDate, endDate, start_time, end_time)}
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
  dialogTitle: PropTypes.string.isRequired,
  dialogErrorMessage: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateShift: PropTypes.func.isRequired,
};

export default ChangeShiftDialog;
