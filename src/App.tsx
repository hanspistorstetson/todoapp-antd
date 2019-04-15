import React, { Component } from 'react';
import { addTodo } from './store/todo/actions'
import { connect } from 'react-redux'
import { Button, Layout, Menu, Breadcrumb, Icon } from 'antd'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout

import ITodo from './models/ITodo';
import { TodoState } from './store/todo/types'
import { ClickParam } from 'antd/lib/menu';

interface IProps {
  dispatch: Function;
  todos: ITodo[]
}

interface IState {
  currentTodo: string;
  activeUser: string;
}

declare global {
  interface Window {
    id: number;
  }
}


window.id = 0
class App extends Component<IProps, IState> {
  readonly state = {
    currentTodo: '',
    activeUser: ''
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

  handleClick = (event: ClickParam): void => {
    this.setState({ activeUser: event.item.props.children })
  }


  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              onClick={this.handleClick}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />Active Users</span>}>
                <Menu.Item key="1">Hans</Menu.Item>
                <Menu.Item key="2">Josh</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

interface AppProps {
  todo: TodoState
}

const mapStateToProps = (state: AppProps) => {
  return { todos: state.todo.todos }
}

export default connect(mapStateToProps)(App);
