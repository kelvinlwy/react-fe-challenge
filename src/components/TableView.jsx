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

class TableView extends Component {
  state = {
    page: 0,
    rowsPerPage: 25,
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: event.target.value});
  };

  render() {
    const {shifts} = this.props;
    const {rowsPerPage, page} = this.state;

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
                    <TableCell>{shift.start_time}</TableCell>
                    <TableCell>{shift.end_time}</TableCell>
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
