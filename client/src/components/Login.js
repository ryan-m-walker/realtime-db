import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/user.actions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(
      this.state.email,
      this.state.password,
      this.props.history
    );
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={this.onChange}
          value={this.state.email}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={this.onChange}
          value={this.state.password}
        />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

const mapState = (state) => ({
  user: state.user
});

const mapDispatch = (dispatch) => ({
  login: (...args) => dispatch(login(...args))
});

export default withRouter(connect(mapState, mapDispatch)(Login));