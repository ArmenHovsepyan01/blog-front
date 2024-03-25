import { createActions } from "redux-actions";
import { Follower } from "@/utilis/types/definitions";

export const {
  follow,
  unfollow,
  getFollowedRequest,
  getFollowed,
  setFollowed,
  setFollowedError,
} = createActions({
  FOLLOW: (follower: Follower) => ({ follower }),
  UNFOLLOW: (id: number) => ({ id }),
  GET_FOLLOWED_REQUEST: () => ({}),
  GET_FOLLOWED: (id: number) => ({ id }),
  SET_FOLLOWED: (followers: Follower[]) => ({ followers }),
  SET_FOLLOWED_ERROR: (error: any) => ({ error }),
});

export enum FollowedActionsType {
  GET_FOLLOWED_REQUEST = "GET_FOLLOWED_REQUEST",
  GET_FOLLOWED = "GET_FOLLOWED",
  SET_FOLLOWED = "SET_FOLLOWED",
  SET_FOLLOWED_ERROR = "SET_FOLLOWED_ERROR",
  FOLLOW = "FOLLOW",
  UNFOLLOW = "UNFOLLOW",
}
