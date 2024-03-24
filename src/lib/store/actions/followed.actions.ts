import { createAction, createActions } from "redux-actions";
import { Follower } from "@/utilis/types/definitions";

export const getFollowedRequest = createAction("GET_FOLLOWED_REQUEST");
export const getFollowed = createAction<number>("GET_FOLLOWED");
export const setFollowed = createAction<Follower[]>("SET_FOLLOWED");
export const setFollowedError = createAction<any>("SET_FOLLOWED_ERROR");
export const follow = createAction<Follower>("FOLLOW");
export const unFollow = createAction<number>("UNFOLLOW");

export enum FollowedActionsType {
  GET_FOLLOWED_REQUEST = "GET_FOLLOWED_REQUEST",
  GET_FOLLOWED = "GET_FOLLOWED",
  SET_FOLLOWED = "SET_FOLLOWED",
  SET_FOLLOWED_ERROR = "SET_FOLLOWED_ERROR",
  FOLLOW = "FOLLOW",
  UNFOLLOW = "UNFOLLOW",
}
