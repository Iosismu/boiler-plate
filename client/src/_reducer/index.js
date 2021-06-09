import { combineReducers } from "redux";
import user from "./user_reducer";
// impot commnet from './comment_reducer';

// combineReducer로 여러가지 reducer들이 있는데 이거를 combineReducer를 이용해서 RootReducer에서 하나로 합쳐준다.
const rootReducer = combineReducers({
  user,
  // commnet
});

export default rootReducer;
