import Task from "../task";

import './task-list.css'

const TaskList = ({ todos, onDeleted }) => {
    const elements = todos.map((item) => {
        const { id, itemProps } = item
        return (
          <li key={id} className={item.className}>
              <Task label={item.label} { ...itemProps }
              onDeleted={() => onDeleted(id)} />
          </li>
        );
    })

    return (
        <ul className='todo-list'>
            {elements}
        </ul>
    );
};

export default TaskList;