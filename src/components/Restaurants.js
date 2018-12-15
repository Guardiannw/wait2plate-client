import React from "react";
import { connect } from "react-redux";
import { getRestaurantsThunk, selcectRestaurant } from "../actions";

import "./Restaurants.css"

export class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityState: ""
    }
  }

  handleSearch = async e => {
    e.preventDefault();
    const { cityState } = this.state;
    try {
      await this.props.getRestaurantsThunk(cityState);
      this.setState({ cityState: "" });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  goToTimer(event, name, id) {
    event.preventDefault();
    this.props.selcectRestaurant(name, id)
    this.props.history.push(`/timer`);
  }

  componentDidMount() {
    this.props.getRestaurantsThunk(this.state.cityState, this.props.latitude, this.props.longitude);
  }

  render() {
    function secondsToMinutesAndSeconds(reportSeconds) {
      {
        const minutes = Math.floor(reportSeconds / 60);
        const seconds = Math.floor(reportSeconds - (minutes * 60))
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      }
    }

    function metersToMiles(meters) {
      const distance = meters / 1609.344;
      return `${distance.toFixed(2)} Miles`;
    }

    const restaurants = this.props.restaurants.map(restaurant => {
      return (
        <tr key={restaurant.id}>
          <td>{restaurant.name}</td>
          <td>{restaurant.display_address}</td>
          <td>{metersToMiles(restaurant.distance)}</td>
          {
            restaurant.reported_times === 'No times reported.'
              ? <td>{restaurant.reported_times}</td>
              : <td>{secondsToMinutesAndSeconds(restaurant.reported_times)}</td>
          }
          <td>
            <button onClick={(e) => this.goToTimer(e, restaurant.name, restaurant.id)}>Report</button>
          </td>
        </tr>
      );
    });

    return (
      <main role="main">
        <header role="banner">
          <h1>Search for Restaurants</h1>
        </header>

        <section>
          <h3 className="restaurant-list">Search</h3>
          <label>Search by City</label>
          <input
            placeholder="City, State"
            type="text"
            name="cityState"
            id="cityState"
            value={this.state.cityState}
            onChange={e => {
              this.setState({ cityState: e.target.value });
            }}
          />
          <button className="search-btn" type="submit" onClick={this.handleSearch}>Search</button>
          <h3 className="restaurant-list">List</h3>
          <table className="text-list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Distance</th>
                <th>Average Wait</th>
                <th>Report Time</th>
              </tr>
            </thead>
            <tbody>{restaurants}</tbody>
          </table>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  latitude: state.latitude,
  longitude: state.longitude
});

const mapDispatchtoProps = {
  getRestaurantsThunk,
  selcectRestaurant
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Restaurants);
