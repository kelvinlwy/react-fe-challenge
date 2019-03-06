import React, {Component, Fragment} from 'react';
import {withTheme} from '@material-ui/core/styles';
import TopBar from './containers/TopBarContainer';
import ViewTabs from './components/ViewTabs';

class App extends Component {
  render() {
    return (
      <Fragment>
        <TopBar/>
        <div className="container__content">
          <ViewTabs/>
        </div>
      </Fragment>
    );
  }
}

export default withTheme()(App);
