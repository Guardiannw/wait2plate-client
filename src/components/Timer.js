import React from "react";

import "./Timer.css";
import { connect } from "react-redux";

import { addPoint, reportTimeThunk } from "../actions";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      lastClearedIncrementer: null,
      submitedTime: false
    };
    this.incrementer = null;

    this.handleStopClick = this.handleStopClick.bind(this);
  }

  componentDidMount() {
    this.incrementer = setInterval(
      () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1
        }),
      1000
    );
  }

  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
    this.props.reportTimeThunk(this.state.secondsElapsed,
      this.props.restaurant.id, this.props.restaurant.name);
    this.setState({
      submitedTime: true
    })
  }

  goToAccount(event) {
    event.preventDefault()
    this.props.history.push(`/account`);
  }

  getSeconds() {
    return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
  }

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }

  render() {
    return (
      <main role="main">
        <header>
          <h1>Wait Time</h1>
          <p>
            Your time has already started. Hit the stop and report button once
            you get your food! You can always edit you times later if you forget
            to press stop.
          </p>
        </header>
        <section>
          <div className="timer">
            <h1 className="timer-display">
              {this.getMinutes()}:{this.getSeconds()}
            </h1>
          </div>
          {
            this.state.submitedTime !== true
              ? <button
                type="submit"
                onClick={this.handleStopClick}
                className="btn btn-report"
              >
                Stop and Report
                    </button>
              : <p>Thank you for submitting your time for {this.props.restaurant.name}! You can review and edit your time on your account page by clicking the button below.</p>
          }
        </section>
        <section>
          {
            this.state.submitedTime !== true
              ? <div className="flip-vertical-right logo">
              </div>
              : <button
                type="submit"
                onClick={(e) => this.goToAccount(e)}
                className="btn"
              >
                Go to Account
          </button>
          }
        </section>
      </main>
    );
  }
}


const mapStateToProps = state => ({
  restaurant: state.restaurant,
  latitude: state.latitude,
  longitude: state.longitude
});

const mapDispatchtoProps = {
  addPoint,
  reportTimeThunk
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Timer);
