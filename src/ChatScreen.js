import React, { Component } from 'react';
import ChatRoom from './ChatComponents/ChatRoom';
import { connect } from 'react-redux';

class ChatScreen extends Component {

  componentDidMount() {

    if(!this.props.auth.isAuthenticated()){
      this.props.history.replace('/home');
    }

    this.props.auth.getProfile((err, profile) => {
      if(profile.nickname !== this.props.currentUsername) {
        this.props.history.replace('/home');
      } else {
        this.props.dispatch({
          type: 'INITIATE_CHAT',
          payload: {
            user: this.props.currentUsername,
            instance: 'v1:us1:79f07ead-d875-417d-869e-1d13e0caf5b4',
            tokenProviderUrl: '/authenticate',
            roomId: this.props.id
          }
        })
      }
    });
  }

  render() {
    if(this.props.currentUser) {
      return(
        <ChatRoom currentUser={{...this.props.currentUser}} id={this.props.id} />
      )
    }
    return (
      <div> Connecting...... </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})
export default connect(mapStateToProps)(ChatScreen);
