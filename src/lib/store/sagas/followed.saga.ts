import { call, fork, put, takeEvery } from "redux-saga/effects";
import {
  FollowedActionsType,
  getFollowedRequest,
  setFollowed,
  setFollowedError,
} from "@/lib/store/actions/followed.actions";
import axios from "axios";

function* getFollowed(action: any) {
  try {
    const id = action?.payload;
    yield put(getFollowedRequest());

    const { data } = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_API_URI}/followings/${id}`,
    );

    yield put(setFollowed(data.data));
  } catch (e) {
    console.error(e);
    yield put(setFollowedError(e));
  }
}

function* followedWatcher() {
  yield takeEvery(FollowedActionsType.GET_FOLLOWED, getFollowed);
}

export default function* followedSaga() {
  yield fork(followedWatcher);
}
