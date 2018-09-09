import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ForumIconForum from '@material-ui/icons/Forum';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from 'react-redux';

import CreateRoom from './CreateRoom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentrooms: [],
      joinablerooms:[]
    }
  }

  componentDidMount() {
    if(this.props.currentUser.getJoinableRooms){
      console.log(this.props.currentUser);
      this.props.dispatch({
        type:'GET_USER_JOINABLE_ROOMS',
        payload:{
          currentUser: this.props.currentUser
        }
      })
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  handleCreateRoom = ({name, isPrivate}) => {
    this.props.dispatch({
      type:'PUT_NEW_ROOM',
      payload:{
        currentUser: this.props.currentUser,
        name,
        isPrivate,
        history: this.props.history
      },
    })
  }

  render() {
    const { classes } = this.props;
    if(this.props.currentUser.rooms.length < 1 && this.props.joinablerooms.length < 1) {
      return (
        <Fragment>
          <div> No current rooms </div>
          <Divider />
          <h3> Create a New Room </h3>
          <CreateRoom />
        </Fragment>
      )
    }
    let currentrooms, joinablerooms;
    if(this.props.currentUser.rooms.length > 0) {
      currentrooms = (
        <List component="nav" className={classes.root}>
        {this.props.currentUser.rooms.map((room) =>
        <Link key={room.id} to={`/room/${room.id}/${this.props.currentUsername}`} onClick={this.goTo.bind(this,`/room/${room.id}/${this.props.currentUsername}`)} >
          <ListItem button >
            <ListItemIcon>
              <ForumIconForum />
            </ListItemIcon>
            <ListItemText primary={room.name} />
          </ListItem>
        </Link>
        )}
      </List>
      );
    }

    if(this.props.joinablerooms.length > 0) {
      joinablerooms = (
        <List component="nav" className={classes.root}>
        {this.props.joinablerooms.map((room) =>
        <Link key={room.id} to={`/room/${room.id}/${this.props.currentUsername}`} onClick={this.goTo.bind(this,`/room/${room.id}/${this.props.currentUsername}`)}>
          <ListItem button >
            <ListItemIcon>
              <ForumIconForum />
            </ListItemIcon>
            <ListItemText primary={room.name} />
          </ListItem>
          </Link>
        )}
      </List>
      );
    }

    return (
      <Router>
      <Fragment>
        <h3> Joined Rooms </h3>
        {currentrooms}
        <Divider />
        <h3> Joinable Rooms </h3>
        {joinablerooms}
        <Divider />
        <h3> Create a New Room </h3>
        <CreateRoom handleCreateRoom={this.handleCreateRoom}/>
      </Fragment>
      </Router>
    )
  }

}

const mapStateToProps = (state) => ({
  ...state.userRooms,
})

export default connect(mapStateToProps)(withStyles(styles)(Rooms));