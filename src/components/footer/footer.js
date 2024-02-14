import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

import './footer.css'

function Footer({ toDo, filter, onFilterChange, onDeleteCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onDeleteCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  toDo: 0,
  filter: 'all',
  onFilterChange: () => {},
  onDeleteCompleted: () => {},
}

Footer.prototype = {
  toDo: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onDeleteCompleted: PropTypes.func,
}

export default Footer
