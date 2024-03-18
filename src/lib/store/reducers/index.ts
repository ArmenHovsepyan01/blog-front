import { combineReducers } from "redux";

import blogReducer from "./blog.reducer";
import userReducer from "./user.reducer";
import likedBlogsReducer from "./likedBlogs.reducer";
import userBlogsReducer from "./userBlogs.reducer";

const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
  likedBlogs: likedBlogsReducer,
  userBlogs: userBlogsReducer,
});

export type AppStore = ReturnType<typeof rootReducer>;

export default rootReducer;
