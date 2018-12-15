import React from "react";
import moment from "moment";
import { connect } from 'react-redux'
import { editTimeThunk, deleteTimeThunk } from "../actions"

export class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      table: {}
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  handleEdit() {

  }

  handleDelete() {

  }

  render() {
    function secondsToMinutesAndSeconds(seconds) {
      const minutes = Math.floor(seconds / 60);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    const data = this.props.reports.filter(
      report => report.user_id === this.props.user.id
    );

    let tableData = data.map(datum => {
      let time = secondsToMinutesAndSeconds(datum.time);
      let date = moment(datum.date).format("MMMM D, YYYY")
      return (
        <tr key={Math.random()}>
          <td>{datum.restaurant_name}</td>
          <td>{time}</td>
          <td>{date}</td>
          <td>
            <button type="button" onClick={this.handleEdit}>Edit</button>
          </td>
          <td>
            <button type="button" onClick={this.handleDelete}>Delete</button>
          </td>
        </tr>
      );
    });


    return (
      <table>
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Time</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  reports: state.reports,
  user: state.user
});

const mapDispatchtoProps = {
  editTimeThunk, deleteTimeThunk
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Table);
