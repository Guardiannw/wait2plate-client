import moment from "moment";
const { API_BASE_URL } = require("../config");

// Login
export const login = async (username, pass) => {
  const user = {
    username,
    password: pass
  };

  try {
    const JWT = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    }).then(res => res.json())

    return JWT;
  } catch (err) {
    console.log(err);
  }
};

// Sign-Up
// Send to server: Username, Email, Password
// Get from server: JWT
export const signup = async (username, email, pass) => {
  try {
    const user = {
      username,
      email,
      password: pass
    };

    const JWT = await fetch(`${API_BASE_URL}/api/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(res => res.json())

    return JWT;
  } catch (err) {
    console.log(err);
  }
};

// Search Restaurants
// Send to server: geolocation || search value (city)
// Get from server: Restaurant Data from Yelp (name, address, distance) & Time data from server (average wait time)
// Report time button
export const searchRestaurants = async ({ cityState, latitude, longitude }) => {
  try {
    let location = cityState;

    let url = new URL(`${API_BASE_URL}/api/restaurants/`);
    if
    (location === '' && latitude === '') {
      let restaurants = {
        id: 0,
        name: '',
        display_address: '',
        distance: '',
        reported_times: ''
      }
      return restaurants
    } else if (location === '') {
      const params = { latitude, longitude };
      url.search = new URLSearchParams(params);
      let restaurants = await fetch(url);
      return restaurants.json();
    } else {
      const params = { location }
      url.search = new URLSearchParams(params);
      let restaurants = await fetch(url);
      return restaurants.json();
    }

  } catch (err) {
    console.log(err);
  }
};

// Report Time
// Send to server: Restaurant id, time, JWT
// Get from server: Send user's updated points
export const reportTime = async (restaurant_id, restaurant_name, time, JWT) => {

  try {
    const report = await fetch(`${API_BASE_URL}/api/reports`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        restaurant_id,
        restaurant_name,
        time
      })
    });

    return report;
  } catch (err) {
    console.log(err);
  }
};

// Get User Reported Times
// Send to server: JWT
// Get from server: User's report times (Restaurant name, time reported (id and the date), user's points)
export const accountUser = async (JWT) => {
  console.log(JWT)

  try {
    function parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      console.log(JSON.parse(window.atob(base64)))
      return JSON.parse(window.atob(base64));
    };
    const user_id = parseJwt(JWT).user.id;
    console.log(user_id)
    const user = await fetch(`${API_BASE_URL}/api/users/${user_id}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())

    console.log(user.reports)

    let reports = []

    user.reports.map(async report => {
      await fetch(`${API_BASE_URL}/api/reports/${report}`, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${JWT}`,
          "Content-Type": "application/json"
        })
      }).then(res => res.json()).then(data => reports.push(data))


    })

    console.log(reports)

    return {
      reports,
      points: user.points,
      user: {
        username: user.username,
        user_id: user.id
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// Edit Reported Times
// Send to server: JWT, report id, new time
// Get from server: new time
export const editTime = async (JWT, reportId, newTime) => {
  // Parse time into number

  try {
    fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
      method: "PUT",
      headers: new Headers({
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json"
      }),
      // send with body pair
      body: JSON.stringify({
        time: newTime
      })
    });

    return newTime;
  } catch (err) {
    console.log(err);
  }
};

// Delete Reported Times
// Send to server: JWT, report id
// Get from server: deletion
export const deleteTime = async (JWT, reportId) => {
  try {
    fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json"
      })
    });
    return console.log(`Report Deleted`);
  } catch (err) {
    console.log(err);
  }
};

// Log Out
export const logOut = async () => {
  localStorage.clear("user");
  localStorage.clear("token");
};
