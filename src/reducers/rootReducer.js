import {combineReducers} from 'redux';
import ShiftsReducer from './ShiftsReducer';
import ShopReducer from "./ShopReducer";

const rootReducer = combineReducers({
  shifts: ShiftsReducer,
  shop: ShopReducer
});

export default rootReducer;
