import React, {Component} from "react";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TableView from '../containers/TableViewContainer';
import {withStyles} from '@material-ui/core/styles';
import TimelineView from "../containers/TimelineViewContainer";
import CalendarView from "../containers/CalendarViewContainer";

class ViewTabs extends Component {
  state = {
    tabIndex: 0
  };

  handleChange = (event, value) => {
    this.setState({tabIndex: value});
  };

  render() {
    const {tabIndex} = this.state;
    const {classes} = this.props;

    return (
      <div className="tabs">
        <Paper className="tabs__wrapper">
          <Tabs
            value={tabIndex}
            onChange={this.handleChange}
            textColor="primary"
            classes={{root: classes.tabsRoot}}
            variant="fullWidth"
            height={"100%"}
          >
            <Tab label={"Table View"} classes={{root: classes.tabRoot}}/>
            <Tab label={"Calendar View"} classes={{root: classes.tabRoot}}/>
            <Tab label={"Timeline View (Incomplete)"} classes={{root: classes.tabRoot}}/>
          </Tabs>
          {/* Rosters in table view*/}
          {
            tabIndex === 0 && <TableView/>
          }

          {/* Rosters in calendar view*/}
          {
            tabIndex === 1 && <CalendarView/>
          }

          {/* Rosters in timeline view*/}
          {
            tabIndex === 2 && <TimelineView/>
          }
        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
  tabsRoot: {
    borderBottom: '1px solid #eeeeee'
  },

  tabRoot: {
    textTransform: 'initial',
    minWidth: 7,
  }
});

ViewTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewTabs);
