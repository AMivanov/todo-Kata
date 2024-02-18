import React from 'react'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if ((this.state.label.trim() !== '') && (this.state.min.trim() !== '' || this.state.sec.trim() !== '')) {
      this.props.onItemAdded(this.state.label, this.state.min, this.state.sec)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            name="label"
            onChange={this.onInputChange}
            value={this.state.label}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            name="min"
            onChange={this.onInputChange}
            value={this.state.min}
            min="0"
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            name="sec"
            onChange={this.onInputChange}
            value={this.state.sec}
            min="0"
            max="59"
          />
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </header>
    )
  }
}
