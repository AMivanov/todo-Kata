import React from 'react'
import PropTypes from 'prop-types'

import CreateTasksTimer from '../create-tasks-timer'
import TimerContainer from '../timer-container'

import './task.css'

export default class Task extends React.Component {
  static defaultProps = {
    label: '',
    completed: false,
    onToggleCompleted: () => {},
    onToggleEdit: () => {},
    onDeleted: () => {},
    editing: false,
    date: new Date(),
    minutes: 0,
    seconds: 0,
    id: 1,
    inactiveTime: 0,
  }

  static propTypes = {
    label: PropTypes.string,
    completed: PropTypes.bool,
    onToggleCompleted: PropTypes.func,
    onToggleEdit: PropTypes.func,
    onDeleted: PropTypes.func,
    editing: PropTypes.bool,
    date: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    id: PropTypes.number,
    inactiveTime: PropTypes.number,
  }

  render() {
    const { label, completed, onToggleCompleted, onToggleEdit, onDeleted, editing, date, minutes, seconds, id, inactiveTime } = this.props

    let classNames = 'view'

    if (completed) {
      classNames += ' completed'
    }

    if (editing) {
      classNames += ' edit'
    }

    return (
      <li>
        <div className={classNames}>
          <input
            id={label}
            className="toggle"
            type="checkbox"
            onClick={onToggleCompleted}
            checked={completed} // Для сохранения состояния чекбокса
            onChange={() => null} // Для сохранения состояния чекбокса
          />
          <label htmlFor={label}>
            <span className="description">{label}</span>
            <TimerContainer
              id={id}
              minutes={minutes}
              seconds={seconds}
              inactiveTime={inactiveTime}
              completed={completed}
            />
            <CreateTasksTimer date={date} />
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    )
  }
}
