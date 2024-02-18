import React from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

export default class App extends React.Component {
  maxId = 1

  state = {
    todoData: [
      this.createTodoItem('Completed task', 10, 10),
      this.createTodoItem('Editing task', 15, 15),
      this.createTodoItem('Active task', 20, 20),
    ],
    filter: 'all',
    inactiveTime: 0,
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.filter !== 'all') {
        this.handleTick()
      }
    }, 1000)
  }

  handleTick = () => {
    this.setState((prevState) => ({
      inactiveTime: prevState.inactiveTime + 1,
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      if (this.state.filter === 'all') {
        this.setState({ inactiveTime: 0 })
      }
    }
  }

  componentWillUnmount() {
    this.clearInterval()
  }

  clearInterval = () => {
    clearInterval(this.intervalId)
  }

  createTodoItem(label, minutes, seconds) {
    return {
      label,
      minutes,
      seconds,
      important: false,
      completed: false,
      editing: false,
      id: this.maxId++,
      date: new Date(),
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
      }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        editing: !oldItem.editing,
      }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onLabelChange = (todoData, id, e, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]

      const newItem = { ...oldItem, label: ` ${text}` }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  addItem = (text, minutes, seconds) => {
    const newItem = this.createTodoItem(text, minutes, seconds)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  filter(items, filter) {
    switch (filter) {
    case 'all':
      return items
    case 'active':
      return items.filter((item) => !item.completed)
    case 'completed':
      return items.filter((item) => item.completed)
    default:
      return items
    }
  }

  deleteItemCompleted = () => {
    this.setState(({ todoData }) => {
      const clearList = todoData.filter((el) => !el.completed)
      return {
        todoData: clearList,
      }
    })
  }

  render() {
    const { todoData, filter } = this.state
    const visibleItems = this.filter(todoData, filter)
    const completedCount = todoData.filter((el) => el.completed).length
    const todoCount = todoData.length - completedCount

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEdit={this.onToggleEdit}
            onLabelChange={this.onLabelChange}
            onItemAdded={this.addItem}
            minutes={this.minutes}
            seconds={this.seconds}
            inactiveTime={this.state.inactiveTime}
          />
          <Footer
            toDo={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onDeleteCompleted={this.deleteItemCompleted}
          />
        </section>
      </section>
    )
  }
}
