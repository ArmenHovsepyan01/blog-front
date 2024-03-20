import { Follower, IUser } from "../../../utilis/types/definitions";
import { RequestStatus } from "../../../utilis/types/enums";
import { PublisherActionsTypes } from "../actions/publisher.actions";

type PublisherActions = {
  type: PublisherActionsTypes;
  payload: any;
};

interface IInitialState {
  publisher: IUser | {};
  status: RequestStatus;
  error?: any;
}

const initialState: IInitialState = {
  publisher: {},
  status: RequestStatus.IDLE,
};

export default function publisherReducer(
  state = initialState,
  action: PublisherActions,
) {
  switch (action.type) {
    case PublisherActionsTypes.SET_PUBLISHER:
      return {
        ...state,
        publisher: action.payload.publisher,
        status: RequestStatus.SUCCESS,
      };
    case PublisherActionsTypes.GET_PUBLISHER_REQUEST:
      return {
        ...state,
        status: RequestStatus.PENDING,
      };
    case PublisherActionsTypes.SET_PUBLISHER_ERROR:
      return {
        ...state,
        status: RequestStatus.ERROR,
      };
    case PublisherActionsTypes.ADD_FOLLOWER:
      return {
        ...state,
        publisher: {
          ...state.publisher,
          userFollowers: [
            // @ts-ignore
            ...state.publisher.userFollowers,
            action.payload.follower,
          ],
        },
      };
    case PublisherActionsTypes.REMOVE_FOLLOWER:
      return {
        ...state,
        publisher: {
          ...state.publisher,
          userFollowers: [
            //   @ts-ignore
            ...state.publisher.userFollowers.filter(
              (item: Follower) => item.id !== action.payload.id,
            ),
          ],
        },
      };
    default:
      return state;
  }
}
