import React, { Component } from 'react';
import { addTodo } from './store/todo/actions'
import { connect } from 'react-redux'

import ITodo from './models/ITodo';
import { TodoState } from './store/todo/types'

interface IProps {
  dispatch: Function;
  todos: ITodo[]
}

interface IState {
  currentTodo: string;
}

declare global {
  interface Window {
    id: number;
  }
}


window.id = 0
class App extends Component<IProps, IState> {
  readonly state = {
    currentTodo: ''
  }

  addTodo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    const todo = {
      id: window.id++,
      text: this.state.currentTodo
    }

    this.props.dispatch(addTodo(todo))

    this.setState({ currentTodo: '' })
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    this.setState({ currentTodo: event.target.value })
  }

  renderTodos = (): JSX.Element[] => {
    return this.props.todos.map((todo: ITodo) => <li key={todo.id}>{todo.text}</li>)
  }


  render() {
    return (
      <div>
        <div>
          <input onChange={this.handleChange} value={this.state.currentTodo} placeholder="Add a todo!" />
          <button onClick={this.addTodo}>Add todo!</button>
        </div>
        <div>
          <ul>
            {this.renderTodos()}
          </ul>
        </div>
      </div>
    );
  }
}

interface AppProps {
  todo: TodoState
}

const mapStateToProps = (state: AppProps) => {
  return { todos: state.todo.todos }
}

export default connect(mapStateToProps)(App);
