import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rooms from './Rooms';

class User extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_CHAT_MANAGER',
      payload: {
        uid: this.props.currentUsername,
        instance: 'v1:us1:79f07ead-d875-417d-869e-1d13e0caf5b4',
        tokenProviderURL: 'http://localhost:3001/authenticate'
      }
    });
  }

  render() {
    if(!this.props.currentUser.id) {
      return <div> Waiting for User info... </div>
    }
    return (
      <Rooms currentUser={this.props.currentUser} {...this.props} />
    )
  }
}

const mapToStateToProps = (state) => ({
  currentUser: {
    ...state.currentUser
  }
})

export default connect(mapToStateToProps)(User);