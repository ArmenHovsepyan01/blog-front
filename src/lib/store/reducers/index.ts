import { combineReducers } from "redux";
import blogReducer from "./blog.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
});

export type AppStore = ReturnType<typeof rootReducer>;
export default rootReducer;
