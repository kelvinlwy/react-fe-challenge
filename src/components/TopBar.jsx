import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';

class TopBar extends Component {
  render() {
    return (
      <AppBar position="sticky" className="topbar">
        <h1 className="topbar__title">{this.props.shop.location}</h1>
      </AppBar>
    );
  }
}

export default TopBar;
