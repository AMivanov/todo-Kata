import TasksFilter from "../tasks-filter";

import './footer.css'

const Footer = ( {toDo} ) => {
    return (
        <footer className='footer'>
            <span className='todo-count'>{toDo} items left</span>
            <ul className='filters'>
                <TasksFilter />
            </ul>
            <button className='clear-completed'>Clear completed</button>
        </footer>
    );
};

export default Footer;