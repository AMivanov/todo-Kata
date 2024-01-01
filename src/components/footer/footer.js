import TasksFilter from "../tasks-filter";

import './footer.css'

const Footer = ({toDo, filter, onFilterChange, onDeleteCompleted}) => {
    return (
        <footer className='footer'>
            <span className='todo-count'>{toDo} items left</span>
            <TasksFilter
                filter={filter}
                onFilterChange={onFilterChange}
            />
            <button type='button'
                    className='clear-completed'
                    onClick={onDeleteCompleted}
            >Clear completed
            </button>
        </footer>
    );
};

export default Footer;