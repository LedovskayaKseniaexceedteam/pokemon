import { setError } from "./actions";
import { SET_ERROR } from "./types";

const initialState = null as null | string;

export const errorReducer = (
  state = initialState,
  action: typeof setError extends (e: string | null) => infer R ? R : never
): typeof initialState => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
