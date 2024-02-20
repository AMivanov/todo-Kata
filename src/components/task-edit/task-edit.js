import React from 'react'
import PropTypes from 'prop-types'

import './task-edit.css'

export default class TaskEdit extends React.Component {
  static defaultProps = {
    id: 1,
    todos: [],
    onToggleEdit: () => {},
    onLabelChange: () => {},
  }

  static propTypes = {
    id: PropTypes.number,
    todos: PropTypes.array,
    onToggleEdit: PropTypes.func,
    onLabelChange: PropTypes.func,
  }

  state = {
    label: '',
  }

  className = 'view'

  componentDidMount() {
    const { todos, id } = this.props
    const currentTodo = todos.find((todo) => todo.id === id)
    if (currentTodo) {
      this.setState({ label: currentTodo.label })
    }
  }

  tmpLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  render() {
    const { id, todos, onToggleEdit, onLabelChange } = this.props

    return (
      <li>
        <div className={this.className}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (this.state.label.trim() !== '') {
                onLabelChange(todos, id, e, this.state.label)
                onToggleEdit(id)
              } else {
                e.preventDefault()
              }
            }}
          >
            <input
              type="text"
              className="edit"
              value={this.state.label}
              onChange={(e) => {
                e.preventDefault()
                this.tmpLabelChange(e)
              }}
              autoFocus
            />
          </form>
        </div>
      </li>
    )
  }
}
