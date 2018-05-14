import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveTodo, stageAddTodo, deleteTodo, stageDeleteTodo } from '../actions/todos.actions';
import { logout } from '../actions/user.actions';

class App extends Component {
  state = {
    todo: '',
    connect: false
  };

  componentDidMount() {
    if (!this.props.user) {
      this.props.history.push('/');
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      text: this.state.todo
    };

    if (this.props.connected) {
    // if (this.state.connect) { // for testing purposes
      this.props.saveTodo(newTodo);
    } else {
      this.props.stageAddTodo({
        ...newTodo, 
        createdBy: this.props.user.userId
      });
    }
    this.setState({todo: ''});
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteTodo = (id) => {
    this.props.connected
      ? this.props.deleteTodo(id)
      : this.props.stageDeleteTodo(id);
  };

  render() {
    return (
      <div>
        <h1>Hello Socket.io</h1>
        {this.props.connected && <p>Connected</p>}
        <button onClick={() => this.props.logout(this.props.history)}>
          logout
        </button>
        {/* <button onClick={() => this.setState((prev) => ({connect: !prev.connect}))}>
          { this.state.connect ? 'Disconnect' : 'Connect' }
        </button> */}
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
          {this.props.syncing ? <p>SYNCING...</p> :
          this.props.todos.map((todo) => (
            <div key={todo._id}className="todo">
              <p>{todo.text}</p>
              <button onClick={() => this.deleteTodo(todo._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  syncing: state.db.syncing,
  connected: state.db.connected,
  todos: state.todos,
  user: state.user
});

const mapDispatch = (dispatch) => ({
  saveTodo: (todo) => dispatch(saveTodo(todo)),
  stageAddTodo: (todo) => dispatch(stageAddTodo(todo)),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  stageDeleteTodo: (id) => dispatch(stageDeleteTodo(id)),
  logout: (history) => dispatch(logout(history))
});

export default connect(mapState, mapDispatch)(App);
