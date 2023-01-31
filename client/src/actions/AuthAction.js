import * as AuthApi from "../api/AuthRequest";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log({ message: error.message });
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log({ message: error.message });
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
