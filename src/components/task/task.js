import React from "react";

import './task.css'

export default class Task extends React.Component {

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
                    <span className='created'>Created 17 seconds ago</span>
                </label>
                <button className='icon icon-edit'
                        onClick={onToggleEdit}></button>
                <button className='icon icon-destroy'
                        onClick={onDeleted}></button>
            </div>

        </li>);
    }
}
