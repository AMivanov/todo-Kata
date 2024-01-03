import React from "react";
import PropTypes from "prop-types";
import CreateTasksTimer from "../create-tasks-timer";

import './task.css'

export default class Task extends React.Component {

    static defaultProps = {
        label: '',
        completed: false,
        onToggleCompleted: () => {},
        onToggleEdit: () => {},
        onDeleted: () => {},
        editing: false
    }

    static propTypes = {
        label: PropTypes.string,
        completed: PropTypes.bool,
        onToggleCompleted: PropTypes.func,
        onToggleEdit: PropTypes.func,
        onDeleted: PropTypes.func,
        editing: PropTypes.bool
    }

    render() {
        const {
            label, completed, onToggleCompleted, onToggleEdit, onDeleted, editing
        } = this.props

        let classNames = 'view'

        if (completed) {
            classNames += ' completed'
        }

        if (editing) {
            classNames += ' edit'
        }

        return (<li>
            <div className={classNames}>
                <input className='toggle'
                       type='checkbox'
                       onClick={onToggleCompleted}
                />
                <label>
                    <span className='description'>{label}</span>
                    <CreateTasksTimer />
                </label>
                <button className='icon icon-edit'
                        onClick={onToggleEdit}></button>
                <button className='icon icon-destroy'
                        onClick={onDeleted}></button>
            </div>

        </li>);
    }
}
