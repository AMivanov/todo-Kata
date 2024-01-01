import React from "react";

import './task-edit.css'

export default class TaskEdit extends React.Component {

    state = {
        label: " ", todos: [], id: 1,
    }

    className = "view"

    tmpLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    render() {

        const {
            id, todos, onToggleEdit, onLabelChange
        } = this.props

        return (<li>
            <div className={this.className}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onLabelChange(todos, id, e, this.state.label)
                    onToggleEdit(id)
                }}>
                    <input type="text"
                           className='edit'
                           onChange={(e) => {
                               e.preventDefault()
                               this.tmpLabelChange(e)
                           }}
                           autoFocus
                    />
                </form>
            </div>
        </li>)
    }
}