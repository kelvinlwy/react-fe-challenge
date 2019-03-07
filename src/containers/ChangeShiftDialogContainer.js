import {connect} from 'react-redux';
import ChangeShiftDialog from '../components/ChangeShiftDialog';
import {changeShiftTime} from "../actions/ShiftsActions";

const mapStateToProps = (state) => {
  return {
    shop: state.shop
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShiftTime: (shiftId, startTime, endTime) => {
      dispatch(changeShiftTime(shiftId, startTime, endTime));
    }
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(ChangeShiftDialog);

