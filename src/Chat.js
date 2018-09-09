import React, { Component } from 'react'
import User from './ChatComponents/User';
import { connect } from 'react-redux';
import loading from './Callback/loading.svg';

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen',
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'CREATE_CHAT_USER',
      payload: {
        url: 'http://localhost:3001/users',
        uname: this.props.username,
      },
    })
  }

  render() {
    if (this.props.currentScreen === 'WhatIsYourUsernameScreen') {
      return (<div>
        <img src={loading} alt="loading"/>
      </div>)
    }
    if (this.props.currentScreen === 'ChatScreen') {
      return <User currentUsername={this.props.currentUsername} {...this.props} />
    }
  }
}

const mapStateToProps = (state) => ({
  currentUsername: state.currentUsername,
  currentScreen: state.currentScreen,
})

export default connect(mapStateToProps)(Chat);
