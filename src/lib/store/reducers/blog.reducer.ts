import { RequestStatus } from "../../../utilis/types/enums";
import { IBlog } from "../../../utilis/types/definitions";
import { BlogActionsTypes } from "../actions/blog.actions";

type BlogAction = {
  type: BlogActionsTypes;
  payload: any;
};

interface IInitialState {
  blogs: IBlog[];
  status: RequestStatus;
  pagesCount: number | null;
  error?: null | any;
}

const initialState: IInitialState = {
  blogs: [],
  status: RequestStatus.IDLE,
  pagesCount: null,
};

export default function blogReducer(state = initialState, action: BlogAction) {
  switch (action.type) {
    case BlogActionsTypes.SET_BLOGS:
      return {
        ...state,
        blogs: action.payload.blogs,
        pagesCount: action.payload.count,
        status: RequestStatus.SUCCESS,
      };
    case BlogActionsTypes.ADD_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload.blog],
      };
    case BlogActionsTypes.GET_BLOGS_REQUEST:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case BlogActionsTypes.SET_BLOGS_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
