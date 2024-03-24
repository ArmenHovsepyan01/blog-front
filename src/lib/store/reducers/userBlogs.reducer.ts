import { UserBlogsAction } from "../actions/userBlogs.action";
import { RequestStatus } from "@/utilis/types/enums";
import { IBlog } from "@/utilis/types/definitions";

interface IAction {
  type: UserBlogsAction;
  payload: any;
}

interface IInitialState {
  blogs: IBlog[];
  status: RequestStatus;
}

const initialState: IInitialState = {
  blogs: [],
  status: RequestStatus.IDLE,
};

export default function userBlogsReducer(
  state = initialState,
  action: IAction,
) {
  switch (action.type) {
    case UserBlogsAction.GET_USER_BLOGS_REQUEST:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case UserBlogsAction.SET_USER_BLOGS:
      return {
        ...state,
        blogs: action.payload.blogs,
        status: RequestStatus.SUCCESS,
      };
    case UserBlogsAction.DELETE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs.filter((item) => item.id !== action.payload.id)],
        status: RequestStatus.SUCCESS,
      };
    case UserBlogsAction.UPDATE_BLOG:
      console.log(action.payload.blog);
      const blog = action.payload.blog as IBlog;
      return {
        ...state,
        blogs: [
          ...state.blogs.map((item) => {
            if (item.id === action.payload.blog.id) {
              return action.payload.blog;
            }

            return item;
          }),
        ],
        status: RequestStatus.SUCCESS,
      };
    case UserBlogsAction.ADD_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload.blog],
        status: RequestStatus.SUCCESS,
      };
    case UserBlogsAction.SET_USER_BLOGS_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
