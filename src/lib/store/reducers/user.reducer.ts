import { UserActionsTypes } from "../actions/user.actions";
import { Follower, IUser } from "../../../utilis/types/definitions";
import { RequestStatus } from "../../../utilis/types/enums";

type UserActions = {
  type: UserActionsTypes;
  payload: any;
};

interface IInitialState {
  user: IUser | {};
  status: RequestStatus;
  error?: any;
}

const initialState: IInitialState = {
  user: {},
  status: RequestStatus.IDLE,
};

export default function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionsTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        status: RequestStatus.SUCCESS,
      };
    case UserActionsTypes.LOG_OUT:
      return {
        ...state,
        user: {},
      };
    case UserActionsTypes.GET_USER_REQUEST:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case UserActionsTypes.SET_USER_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
      };
    case UserActionsTypes.FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          userFollowed: [
            // @ts-ignore
            action.payload.follower,
          ],
        },
      };
    case UserActionsTypes.UNFOLLOW:
      // @ts-ignore
      const userFollowed = state?.user?.userFollowed.filter(
        (item: Follower) => item.id !== action.payload.id,
      );

      return {
        ...state,
        user: {
          ...state.user,
          userFollowed,
        },
      };
    default:
      return state;
  }
}
