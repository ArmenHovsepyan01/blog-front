import { Follower } from "@/utilis/types/definitions";
import { FollowedActionsType } from "@/lib/store/actions/followed.actions";
import { RequestStatus } from "@/utilis/types/enums";
import { createSelector } from "reselect";
import RootState, { AppStore } from "../reducers/index";
import { number } from "yup";

type FollowedAction = {
  type: FollowedActionsType;
  payload: any;
};

interface IInitialState {
  followed: Follower[];
  status: RequestStatus;
  error?: any;
}

const initialState: IInitialState = {
  followed: [],
  status: RequestStatus.IDLE,
};

export default function followedReducer(
  state = initialState,
  action: FollowedAction,
) {
  switch (action.type) {
    case FollowedActionsType.SET_FOLLOWED:
      return {
        ...state,
        followed: action.payload.followers,
        status: RequestStatus.SUCCESS,
      };
    case FollowedActionsType.GET_FOLLOWED_REQUEST:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case FollowedActionsType.SET_FOLLOWED_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case FollowedActionsType.FOLLOW:
      return {
        ...state,
        followed: [...state.followed, action.payload.follower],
      };
    case FollowedActionsType.UNFOLLOW:
      return {
        ...state,
        followed: [
          ...state.followed.filter((item) => item.id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
}

export const getFollowed = (state: AppStore) => state.followed.followed;

export const findFollowerById = createSelector(
  [getFollowed, (followers, id: number) => id],
  (followers: Follower[], id: number) =>
    followers.find((follower: Follower) => follower.id === id),
);
