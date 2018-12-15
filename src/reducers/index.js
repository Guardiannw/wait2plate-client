import * as actions from "../actions";

const initialState = {
  fetching: false,
  fetched: false,
  user: '',
  token: {
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWMwZGY5NmJmNGJiOTczMWM4ZmI1YTE0IiwidXNlcm5hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicG9pbnRzIjoxLCJyZXBvcnRzIjpbIjVjMGRmOTg1ZjRiYjk3MzFjOGZiNWExNSJdfSwiaWF0IjoxNTQ0NDIwOTQzLCJleHAiOjE1NDUwMjU3NDMsInN1YiI6IlRlc3QifQ.zfXS0J-SJMM-8zyAV9XTyYDmHbDh8B5En9SZ6HoMMnQ"
  },
  reports: [],
  points: 0,
  restaurants: [],
  restaurant: {
    name: '',
    id: ''
  },
  latitude: "",
  longitude: "",
  error: null
};

export const wait2plateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_POINT:
      return { ...state, points: Math.floor(state.points + 1) };

    case actions.CLEAR_ERROR:
      return { ...state, error: null };

    case actions.DELETE_TIME_ACTION:
      return {
        ...state,
        reports: state.reports.filter(report => report.id !== action.report_id)
      };

    case actions.EDIT_TIME_ACTION:
      return {
        ...state,
        reports: state.reports.map(report => {
          if (report.id === action.report_id) {
            return { ...report, time: action.newTime };
          }
          return report;
        })
      };

    case actions.FETCHED:
      return {
        ...state,
        fetched: true,
        fetching: false
      };

    case actions.FETCHED_HAS_ERROR:
      return {
        ...state,
        error: action.error.message,
        fetching: false
      };

    case actions.FIND_RESTAURANTS:
      return { ...state, restaurants: action.restaurants };

    case actions.SELECT_RESTAURANT:
      return { ...state, restaurant: { name: action.name, id: action.id } }

    case actions.GET_USER:
      return {
        ...state,
        user: action.user
      };

    case actions.GET_USER_REPORTS:
      return { ...state, reports: action.reports, points: action.points };

    case actions.IS_FETCHING:
      return { ...state, fetching: true };

    case actions.LOGIN_ACTION:
      return { ...state, token: action.JWT };

    case actions.SET_GEOLOCATION:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude
      }

    case actions.SIGN_UP_ACTION:
      return { ...state, token: action.JWT };

    case actions.REPORT_TIME_ACTION:
      return { ...state, reports: action.reports };

    default:
      return state;
  }
};
