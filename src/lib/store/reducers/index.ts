import { combineReducers } from "redux";

import blogReducer from "./blog.reducer";
import likedBlogsReducer from "./likedBlogs.reducer";
import userBlogsReducer from "./userBlogs.reducer";
import followedReducer from "@/lib/store/reducers/followed.reducer";

const rootReducer = combineReducers({
  blog: blogReducer,
  likedBlogs: likedBlogsReducer,
  userBlogs: userBlogsReducer,
  followed: followedReducer,
});

export type AppStore = ReturnType<typeof rootReducer>;

export default rootReducer;
