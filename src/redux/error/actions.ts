import { SET_ERROR } from "./types";

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
});
