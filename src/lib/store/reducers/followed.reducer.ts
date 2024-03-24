import { Follower } from "@/utilis/types/definitions";
import { FollowedActionsType } from "@/lib/store/actions/followed.actions";
import { RequestStatus } from "@/utilis/types/enums";

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
        followed: action.payload,
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
        error: action.payload,
      };
    case FollowedActionsType.FOLLOW:
      return {
        ...state,
        followed: [...state.followed, action.payload],
      };
    case FollowedActionsType.UNFOLLOW:
      return {
        ...state,
        followed: [
          ...state.followed.filter((item) => item.id !== action.payload),
        ],
      };
    default:
      return state;
  }
}
