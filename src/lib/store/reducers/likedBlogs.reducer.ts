import { ILikedBlog } from "../../../utilis/types/definitions";
import { RequestStatus } from "../../../utilis/types/enums";
import { LikedBlogsActionTypes } from "../actions/likedBlogs.actions";

interface ILikedBlogsAction {
  type: LikedBlogsActionTypes;
  payload: any;
}

interface IInitialState {
  likedBlogs: ILikedBlog[];
  status: RequestStatus;
  error?: any;
}

const initialState: IInitialState = {
  likedBlogs: [],
  status: RequestStatus.IDLE,
};

export default function likedBlogsReducer(
  state = initialState,
  action: ILikedBlogsAction,
) {
  switch (action.type) {
    case LikedBlogsActionTypes.GET_LIKED_BLOGS_REQUEST:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case LikedBlogsActionTypes.SET_LIKED_BLOGS:
      return {
        ...state,
        likedBlogs: action.payload.data,
        status: RequestStatus.SUCCESS,
      };
    case LikedBlogsActionTypes.ADD_LIKED_BLOGS:
      return {
        ...state,
        likedBlogs: [...state.likedBlogs, action.payload.data as ILikedBlog],
        status: RequestStatus.SUCCESS,
      };
    case LikedBlogsActionTypes.LIKED_BLOGS_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
