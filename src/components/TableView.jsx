import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter'
import TablePaginationActionsView from './TablePaginationActionsView';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import moment from "moment";
import 'moment-timezone';
import ChangeShiftDialog from './ChangeShiftDialog';

class TableView extends Component {
  state = {
    page: 0,
    rowsPerPage: 25,
    open: false
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: event.target.value});
  };

  handleEdit = shift => {
    this.setState({
      open: true,
      shiftId: shift.id,
      employeeId: shift.employee.id,
      dialogTitle: `Edit ${shift.employee.first_name} ${shift.employee.last_name} (${shift.role.name}) shift`,
      startTime: moment(shift.start_time).format("HH:mm"),
      endTime: moment(shift.end_time).format("HH:mm"),
      startDate: moment(shift.start_time).format("YYYY-MM-DD"),
      endDate: moment(shift.end_time).format("YYYY-MM-DD"),
      dialogErrorMessage: ""
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleUpdateShift = (startDate, endDate, startTime, endTime) => {
    const startDateTime = moment.tz(`${startDate} ${startTime}`, this.props.shop.timezone);
    const endDateTime = moment.tz(`${endDate} ${endTime}`, this.props.shop.timezone);

    const diff = endDateTime.diff(startDateTime, 'hours');
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
    const {shifts} = this.props;
    const {open, dialogTitle, startDate, endDate, startTime, endTime, dialogErrorMessage, rowsPerPage, page} = this.state;

    return (
      <div className={"tabs__table"}>
        <Table style={{tableLayout: 'fixed'}}>
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Break Duration</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              shifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(shift => {
                const color = shift.role.text_colour;
                const backgroundColor = shift.role.background_colour;

                return (
                  <TableRow key={shift.id}>
                    <TableCell>{shift.start_date}</TableCell>
                    <TableCell>{shift.start_time}<IconButton aria-label="Edit"
                                                             onClick={() => this.handleEdit(shift)}><EditIcon/></IconButton></TableCell>
                    <TableCell>{shift.end_time}<IconButton aria-label="Edit"
                                                           onClick={() => this.handleEdit(shift)}><EditIcon/></IconButton></TableCell>
                    <TableCell style={{backgroundColor, color}}>{shift.role.name}</TableCell>
                    <TableCell>{shift.employee.first_name} {shift.employee.last_name}</TableCell>
                    <TableCell>{shift.break_duration}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                colSpan={6}
                count={shifts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsView}
                className={"paginator"}
              />
            </TableRow>
          </TableFooter>
        </Table>

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
            handleUpdateShift={this.handleUpdateShift.bind(this)}
            dialogErrorMessage={dialogErrorMessage}
          />
        }
      </div>
    );
  }
}

TableView.propTypes = {
  shifts: PropTypes.array.isRequired
};

TableView.defaultProps = {
  shifts: []
};

export default TableView;
