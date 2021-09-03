import initState from "./state";
import { SET_GRAPH_CLIENT } from "./types";

export default (state = initState, action) => {
  switch (action.type) {
    case SET_GRAPH_CLIENT:
      return {
        ...state,
        client: action.payload,
      };

    default:
      return state;
  }
};
