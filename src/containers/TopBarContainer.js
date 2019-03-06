import {connect} from 'react-redux';
import TopBar from '../components/TopBar';

const mapStateToProps = (state) => {
  return {shop: state.shop}
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(TopBar);

