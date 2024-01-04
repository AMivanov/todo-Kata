import React from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TasksFilter extends React.Component {
  static defaultProps = {
    filter: 'all',
    onFilterChange: () => {},
  }

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  }

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { filter, onFilterChange } = this.props
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name ? 'selected' : undefined
      return (
        <button
          type="button"
          className={isActive}
          key={name}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      )
    })

    return (
      <div className="filters">
        {buttons}
      </div>
    )
  }
}
