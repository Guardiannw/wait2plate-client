import {
  addPoint,
  deleteTimeAction,
  editTimeAction,
  fetched,
  fetchedHasError,
  fetching,
  findRestaurants,
  reportTimeAction,
  getUsers,
  getUserReports,
  loginAction,
  signupAction,
  clearError
} from "../actions/index";

import { wait2plateReducer } from "./index";
import { stat } from "fs";

describe("wait2plateReducer", () => {
  const points = 5;
  const error = { message: "This is a test" };
  const users = [
    {
      id: "1",
      username: "exampleUser",
      points: 7,
      reports: []
    }
  ];
  const reports = [
    {
      id: "1000",
      restaurant_id: "example123",
      restaurant_name: "exampleGrill",
      time: 20000,
      user_id: "1",
      data: Date.now()
    }
  ];
  const restaurants = [
    {
      id: "103",
      name: "Stevo's Bar and Grill",
      address: "100 Center St. Lehi, UT 84043",
      distance: "0.5 mi",
      reported_times: [780000]
    }
  ];

  it("Should set the initial state when nothing is passed in", () => {
    const state = wait2plateReducer(undefined, { type: "__UNKNOWN" });
    expect(state).toEqual({
      fetching: false,
      fetched: false,
      users: [],
      token: "",
      reports: [],
      points: 0,
      restaurants: [],
      error: null
    });
  });

  it("Should return the current state on an unknown action", () => {
    let currentState = {};
    const state = wait2plateReducer(currentState, { type: "__UNKNOWN" });
    expect(state).toBe(currentState);
  });

  describe("addPoint", () => {
    it("Should add point", () => {
      let state = {
        points: 5
      };
      state = wait2plateReducer(state, addPoint(points));
      expect(state).toEqual({
        points: 6
      });
    });
  });

  describe("deleteTimeAction", () => {
    it("Should delete reports", () => {
      let state = {
        reports: [
          {
            id: "102",
            restaurantId: "1002",
            time: 1128000,
            date: "October 4, 2018"
          }
        ]
      };

      state = wait2plateReducer(state, deleteTimeAction("102"));
      expect(state).toEqual({
        reports: []
      });
    });
  });

  describe("editTimeAction", () => {
    it("Should edit the time of a report", () => {
      let state = {
        reports: [
          {
            id: "102",
            restaurantId: "1002",
            time: 1128000,
            date: "October 4, 2018"
          }
        ]
      };

      state = wait2plateReducer(state, editTimeAction("102", 7777777));
      expect(state).toEqual({
        reports: [
          {
            id: "102",
            restaurantId: "1002",
            time: 7777777,
            date: "October 4, 2018"
          }
        ]
      });
    });
  });

  describe("fetched", () => {
    it("Should change loading to false", () => {
      let state = {
        fetching: true,
        fetched: false
      };

      state = wait2plateReducer(state, fetched());
      expect(state).toEqual({
        fetching: false,
        fetched: true
      });
    });
  });

  describe("fetching", () => {
    it("Should return loading as true", () => {
      let state = {
        fetching: false
      };
      state = wait2plateReducer(state, fetching());
      expect(state).toEqual({
        fetching: true
      });
    });
  });

  describe("fetchedHasError", () => {
    it("Should return error message", () => {
      let state = {
        fetching: true,
        error: null
      };
      state = wait2plateReducer(state, fetchedHasError(error));
      expect(state).toEqual({
        fetching: false,
        error: error.message
      });
    });
  });

  // describe("findRestaurants", () => {
  //   it("Should return restaurants from server", () => {
  //     let state = {
  //       restaurants: []
  //     };
  //     state = wait2plateReducer(state, findRestaurants(restaurants));
  //     expect(state).toEqual({
  //       restaurants: [
  //         {
  //           id: "103",
  //           name: "Stevo's Bar and Grill",
  //           address: "100 Center St. Lehi, UT 84043",
  //           distance: "0.5 mi",
  //           reported_times: [780000]
  //         }
  //       ]
  //     });
  //   });
  // });

  describe("reportTimeAction", () => {
    it("Should report time", () => {
      let state = {
        reports: []
      };
      state = wait2plateReducer(state, reportTimeAction(reports));
      expect(state).toEqual({
        reports
      });
    });
  });

  describe("getUsers", () => {
    it("Should return all the users", () => {
      let state = {
        users: []
      };
      state = wait2plateReducer(state, getUsers(users));
      expect(state).toEqual({
        users
      });
    });
  });

  describe("getUserReports", () => {
    it("Should return reports from users", () => {
      let state = {
        points: "",
        reports: []
      };
      state = wait2plateReducer(state, getUserReports(reports, points));
      expect(state).toEqual({
        points,
        reports
      });
    });
  });

  describe("loginAction", () => {
    it("Should return token", () => {
      let state = {
        token: ""
      };
      const JWT = "1234";
      state = wait2plateReducer(state, loginAction(JWT));
      expect(state).toEqual({
        token: JWT
      });
    });
  });

  describe("signupAction", () => {
    it("Should return token", () => {
      let state = {
        token: ""
      };
      const JWT = "1234";
      state = wait2plateReducer(state, signupAction(JWT));
      expect(state).toEqual({
        token: JWT
      });
    });
  });

  describe("clearError", () => {
    it("Should clear error", () => {
      let state = {
        error
      };
      state = wait2plateReducer(state, clearError());
      expect(state).toEqual({
        error: null
      });
    });
  });
});
