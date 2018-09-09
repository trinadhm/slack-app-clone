import React, { Component } from 'react';
import Chat from '../Chat';
import loading from '../Callback/loading.svg';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile:{}
    }
  }
  login() {
    this.props.auth.login();
  }
  componentDidMount(){
    this.props.auth.getProfile((err, profile) => {
      this.props.dispatch({
        type: 'SET_PROFILE',
        payload: profile,
      })
    })
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if(!this.props.profile.nickname) {
      return (
        <div>
          <img src={loading} alt="loading"/>
        </div>
      )
    }
    
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <Chat username={this.props.profile.nickname} {...this.props}/>
          )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps)(Home);
