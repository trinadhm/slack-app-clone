import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl, FormHelperText, FormControlLabel, FormGroup } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isPrivate: false,
    }
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleRadioBtn = event => {
    this.setState({
      isPrivate: event.target.checked
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if(this.props.handleCreateRoom) {
      this.props.handleCreateRoom({
        ...this.state 
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <FormControl className={classes.formControl} aria-describedby="name-helper-text">
          <InputLabel htmlFor="name-helper">Rooms name</InputLabel>
          <Input id="name-helper" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText id="name-helper-text">Enter a new Room name</FormHelperText>
        </FormControl>
        <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.isPrivate}
              onChange={this.handleRadioBtn}
              value="Private"
              color="primary"
            />
          }
          label="is Private"
        />
        </FormGroup>
      </form>
    )
  }
}

export default withStyles(styles)(CreateRoom);