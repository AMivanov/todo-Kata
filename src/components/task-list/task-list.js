import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import TaskEdit from '../task-edit'

import './task-list.css'

export default class TaskList extends React.Component {
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onToggleEdit: () => {},
    onLabelChange: () => {},
  }

  static propTypes = {
    todos: PropTypes.array,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEdit: PropTypes.func,
    onLabelChange: PropTypes.func,
  }

  render() {
    const { todos, onDeleted, onToggleCompleted, onToggleEdit, onLabelChange, onItemAdded } = this.props

    const elements = todos.map((item) => {
      if (item.editing) {
        return (
          <TaskEdit
            {...item}
            key={item.id}
            todos={this.props.todos}
            onToggleEdit={() => onToggleEdit(item.id)}
            onLabelChange={onLabelChange}
            onItemAdded={onItemAdded}
          />
        )
      }
      return (
        <Task
          {...item}
          key={item.id}
          onToggleCompleted={() => onToggleCompleted(item.id)}
          onToggleEdit={() => onToggleEdit(item.id)}
          onDeleted={() => onDeleted(item.id)}
          onItemAdded={onItemAdded}
        />
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
