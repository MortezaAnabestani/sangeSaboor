import text from "../components/TextOfBook";

const initialState = text;

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NEW_TEXT":
      return (state = action.payload);
    default:
      return state;
  }
};

export default textReducer;
