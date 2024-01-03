import React from "react";

import Task from "../task";
import TaskEdit from "../task-edit";
import PropTypes from "prop-types";

import './task-list.css'

export default class TaskList extends React.Component {

    static defaultProps = {
        todos: [],
        onDeleted: () => {},
        onToggleCompleted: () => {},
        onToggleEdit: () => {},
        onLabelChange: () => {}
    }

    static propTypes = {
        todos: PropTypes.array,
        onDeleted: PropTypes.func,
        onToggleCompleted: PropTypes.func,
        onToggleEdit: PropTypes.func,
        onLabelChange: PropTypes.func
    }

    state = {
        todos: [],
    }

    render() {
        const {
            todos, onDeleted, onToggleCompleted, onToggleEdit, onLabelChange
        } = this.props

        const elements = todos.map((item) => {
            if (item.editing) {
                return (<TaskEdit {...item}
                                  key={item.id}
                                  todos={this.props.todos}
                                  onToggleEdit={() => onToggleEdit(item.id)}
                                  onLabelChange={onLabelChange}
                />)
            } else {
                return (<Task {...item}
                              key={item.id}
                              onToggleCompleted={() => onToggleCompleted(item.id)}
                              onToggleEdit={() => onToggleEdit(item.id)}
                              onDeleted={() => onDeleted(item.id)}
                />)
            }
        })
        return (<ul className='todo-list'>
            {elements}
        </ul>);

    }
}
