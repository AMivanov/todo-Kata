import React from "react";

import './task.css'

export default class Task extends React.Component {

    state = {
        completed: false,
        editing: false,
        edit: false
    }

    onLabelClick = () => {
        this.setState(({completed}) => {
            return {
                completed: !completed
            }
        })
        console.log(`${this.props.label}`)
    }

    onMarkEdit = () => {
        this.setState({
            editing: true
        })
        console.log(`${this.props.label}`)
    }

    onMarkDestroy = () => {
        this.setState({
            edit: true
        })
        console.log(`${this.props.label}`)
    }

    render() {
        const { label, onDeleted } = this.props
        const { completed, editing, edit } = this.state

        let classNames = 'view'
        if(completed) {
            classNames += ' completed'
        }

        if(editing) {
            classNames += ' editing'
        }

        if(edit) {
            classNames += ' edit'
        }

        return(
            <div>
                <div className={classNames}>
                    <input className='toggle'
                           type="checkbox"
                           onClick={ this.onLabelClick }
                    />
                    <label>
                        <span className='description'>{label}</span>
                        <span className='created'>Created 17 seconds ago</span>
                    </label>
                    <button className='icon icon-edit'
                            onClick={ this.onMarkEdit }></button>
                    <button className='icon icon-destroy'
                            onClick={ onDeleted }></button>
                </div>
                <form>
                    <input type="text"
                           className='edit'
                           onChange={(e) => {
                               e.preventDefault()
                           }}
                           value='Editing task'/>
                </form>

            </div>
        )

    }


}
