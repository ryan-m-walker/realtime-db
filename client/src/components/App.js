import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions/todos.actions';

class App extends Component {
  state = {
    todo: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo({
      text: this.state.todo
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Hello Socket.io</h1>
        {this.props.connected && <p>Connected</p>}
        <hr />
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="todo"
            id="todo"
            value={this.state.todo}
            onChange={this.onChange}
          />
          <input type="submit" value="Add" />
        </form>
        <div>
          {this.props.todos.map((todo) => <p key={todo._id}>{todo.text}</p>)}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  connected: state.io.connected,
  todos: state.todos
});

const mapDispatch = (dispatch) => ({
  addTodo: (todo) => dispatch(addTodo(todo))
});

export default connect(mapState, mapDispatch)(App);
