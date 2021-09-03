import { SET_GRAPH_CLIENT } from "./types";

export default {
  [SET_GRAPH_CLIENT]: (payload) => ({
    type: SET_GRAPH_CLIENT,
    payload,
  }),
};
