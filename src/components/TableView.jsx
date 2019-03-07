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
import ChangeShiftDialog from '../containers/ChangeShiftDialogContainer';

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
      selectedShift: shift,
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {shifts} = this.props;
    const {open, rowsPerPage, page, selectedShift} = this.state;

    return (
      <div className={"tabs__table"}>
        <Table style={{tableLayout: 'fixed'}}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Start Date</TableCell>
              <TableCell colSpan={2}>Start Time</TableCell>
              <TableCell colSpan={2}>End Time</TableCell>
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
                    <TableCell colSpan={2}>{shift.start_date}</TableCell>
                    <TableCell colSpan={2}>{shift.start_time}
                      <IconButton aria-label="Edit" onClick={() => this.handleEdit(shift)}>
                        <EditIcon/>
                      </IconButton>
                    </TableCell>
                    <TableCell colSpan={2}>{shift.end_time}
                      <IconButton aria-label="Edit" onClick={() => this.handleEdit(shift)}>
                        <EditIcon/>
                      </IconButton>
                    </TableCell>
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
                colSpan={8}
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
            handleClose={this.handleClose}
            shift={selectedShift}
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
