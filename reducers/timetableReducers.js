import {
  TIMETABLE_FETCH_FAILURE,
  TIMETABLE_FETCH_SUCCESS,
  TIMETABLE_IS_FETCHING,
  CLEAR_TIMETABLE,
} from "../constants/timetableConstants";

export const initialState = {
  isFetching: false,
  timetable: {},
  error: "",
};

export default (state = initialState, action = null) => {
  const { type, timetableFrag, error } = action;

  switch (type) {
    case TIMETABLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    }

    case TIMETABLE_FETCH_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case TIMETABLE_FETCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        timetable: {
          ...state.timetable,
          ...timetableFrag,
        },
      };
    }

    case CLEAR_TIMETABLE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
