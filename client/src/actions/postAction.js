import * as PostApi from "../api/PostApi.js";

export const getTimelinePosts = (id) => async (dispatch) => {
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};
