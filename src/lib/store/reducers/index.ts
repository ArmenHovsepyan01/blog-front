import { combineReducers } from "redux";

import blogReducer from "./blog.reducer";
import userReducer from "./user.reducer";
import likedBlogsReducer from "./likedBlogs.reducer";

const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
  likedBlogs: likedBlogsReducer,
});

export type AppStore = ReturnType<typeof rootReducer>;

export default rootReducer;
