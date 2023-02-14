
import {
  configureStore,
AnyAction,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userSlice from "./private/userSlice";
 import loyalityPointSlice from "./private/loyalityPointSlice";


const combinedReducer = combineReducers({
  userInformation: userSlice,
loyalityPointInformation:loyalityPointSlice
});

const rootReducers = (state:any, action:any) => {
  if (action.type === "redux_reset/setUserinfo") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

// const configureAppStore = (initialState:any, options:any) => {
//   const store = configureStore({
//     reducer: rootReducer,
//     middleware: [...getDefaultMiddleware()],
//   });
//   return store;
// };
export default rootReducers;
