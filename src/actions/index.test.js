import {
  ADD_POINT,
  addPoint,
  DELETE_TIME_ACTION,
  deleteTimeAction,
  EDIT_TIME_ACTION,
  editTimeAction,
  FETCHED,
  fetched,
  FETCHED_HAS_ERROR,
  fetchedHasError,
  IS_FETCHING,
  fetching,
  FIND_RESTAURANTS,
  findRestaurants,
  REPORT_TIME_ACTION,
  reportTimeAction,
  GET_USERS,
  getUsers,
  GET_USER_REPORTS,
  getUserReports,
  LOGIN_ACTION,
  loginAction,
  SIGN_UP_ACTION,
  signupAction,
  CLEAR_ERROR,
  clearError
} from "./index";

describe("addPoint", () => {
  it("Should return the action", () => {
    const points = 5;
    const action = addPoint(points);
    expect(action.type).toEqual(ADD_POINT);
    expect(action.points).toEqual(points);
  });
});

describe("deleteTimeAction", () => {
  it("Should return the action", () => {
    const report_id = "1234";
    const action = deleteTimeAction(report_id);
    expect(action.type).toEqual(DELETE_TIME_ACTION);
    expect(action.report_id).toEqual(report_id);
  });
});

describe("editTimeAction", () => {
  it("Should return the action", () => {
    const report_id = "1234";
    const newTime = "10000";
    const action = editTimeAction(report_id, newTime);
    expect(action.type).toEqual(EDIT_TIME_ACTION);
    expect(action.newTime).toEqual(newTime);
    expect(action.report_id).toEqual(report_id);
  });
});

describe("fetched", () => {
  it("Should return the action", () => {
    const action = fetched();
    expect(action.type).toEqual(FETCHED);
  });
});

describe("fetchedHasError", () => {
  it("Should return the action", () => {
    const error = "Error";
    const action = fetchedHasError(error);
    expect(action.type).toEqual(FETCHED_HAS_ERROR);
    expect(action.error).toEqual(error);
  });
});

describe("findRestaurants", () => {
  it("Should return the action", () => {
    const restaurants = [];
    const action = findRestaurants(restaurants);
    expect(action.type).toEqual(FIND_RESTAURANTS);
    expect(action.restaurants).toEqual(restaurants);
  });
});

describe("fetching", () => {
  it("Should return the action", () => {
    const action = fetching();
    expect(action.type).toEqual(IS_FETCHING);
  });
});

describe("reportTimeAction", () => {
  it("Should return the action", () => {
    const reports = {};
    const action = reportTimeAction(reports);
    expect(action.type).toEqual(REPORT_TIME_ACTION);
    expect(action.reports).toEqual(reports);
  });
});

describe("getUsers", () => {
  it("Should return the action", () => {
    const users = [];
    const action = getUsers(users);
    expect(action.type).toEqual(GET_USERS);
    expect(action.users).toEqual(users);
  });
});

describe("getUserReports", () => {
  it("Should return the action", () => {
    const reports = [];
    const points = 1;
    const action = getUserReports(reports, points);
    expect(action.type).toEqual(GET_USER_REPORTS);
    expect(action.reports).toEqual(reports);
    expect(action.points).toEqual(points);
  });
});

describe("loginAction", () => {
  it("Should return the action", () => {
    const JWT = "1234";
    const action = loginAction(JWT);
    expect(action.type).toEqual(LOGIN_ACTION);
    expect(action.JWT).toEqual(JWT);
  });
});

describe("signupAction", () => {
  it("Should return the action", () => {
    const JWT = "1234";
    const action = signupAction(JWT);
    expect(action.type).toEqual(SIGN_UP_ACTION);
    expect(action.JWT).toEqual(JWT);
  });
});

describe("clearError", () => {
  it("Should return the action", () => {
    const action = clearError();
    expect(action.type).toEqual(CLEAR_ERROR);
  });
});
