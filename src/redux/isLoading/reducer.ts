import { setIsLoading } from "./actions";
import { SET_IS_LOADING } from "./types";

const initialState = false as boolean;

export const errorReducer = (
  state = initialState,
  action: typeof setIsLoading extends (e: boolean) => infer R ? R : never
): typeof initialState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.payload;
    default:
      return state;
  }
};
