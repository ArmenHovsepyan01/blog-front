export enum UserActionsTypes {
  GET_USER = "GET_USER",
  SET_USER = "SET_USER",
  GET_USER_REQUEST = "GET_USER_REQUEST",
  SET_USER_ERROR = "SET_USER_ERROR",
  LOG_OUT = "LOG_OUT",
}

export const getUser = () => ({
  type: UserActionsTypes.GET_USER,
});

export const setUser = (user: any) => ({
  type: UserActionsTypes.SET_USER,
  payload: {
    user,
  },
});

export const getUserRequest = () => ({
  type: UserActionsTypes.GET_USER_REQUEST,
});

export const setUserError = () => ({
  type: UserActionsTypes.SET_USER_ERROR,
});

export const logOut = () => ({
  type: UserActionsTypes.LOG_OUT,
});
