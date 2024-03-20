import store from "../store";

export enum PublisherActionsTypes {
  GET_PUBLISHER = "GET_PUBLISHER",
  SET_PUBLISHER = "SET_PUBLISHER",
  GET_PUBLISHER_REQUEST = "GET_PUBLISHER_REQUEST",
  SET_PUBLISHER_ERROR = "SET_PUBLISHER_ERROR",
  ADD_FOLLOWER = "ADD_FOLLOWER",
  REMOVE_FOLLOWER = "REMOVE_FOLLOWER",
}

export const getPublisher = (id: number) => ({
  type: PublisherActionsTypes.GET_PUBLISHER,
  payload: {
    id,
  },
});

export const setPublisher = (publisher: any) => ({
  type: PublisherActionsTypes.SET_PUBLISHER,
  payload: {
    publisher,
  },
});

export const getPublisherRequest = () => ({
  type: PublisherActionsTypes.GET_PUBLISHER_REQUEST,
});

export const setPublisherError = () => ({
  type: PublisherActionsTypes.SET_PUBLISHER_ERROR,
});

export const addFollower = (follower: any) => ({
  type: PublisherActionsTypes.ADD_FOLLOWER,
  payload: {
    follower,
  },
});

export const removeFollower = (id: number) => ({
  type: PublisherActionsTypes.REMOVE_FOLLOWER,
  payload: {
    id,
  },
});
