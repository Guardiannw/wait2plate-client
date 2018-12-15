import React from "react";
import { shallow } from "enzyme";

import { Login } from "./Login";

describe("<Login />", () => {
  it("Renders without crashing", () => {
    shallow(
      <Login
        loginThunk={() => Promise.resolve(1234)}
        signupThunk={() => Promise.resolve(1234)}
      />
    );
  });
});
