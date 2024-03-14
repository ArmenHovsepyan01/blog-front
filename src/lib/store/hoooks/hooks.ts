import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppStore } from "../reducers";
export const useAppSelector = useSelector.withTypes<AppStore>();
