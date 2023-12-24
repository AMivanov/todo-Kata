import React from "react";

import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

import './app.css'


export default class App extends React.Component {

    state = {
        todoData: [
            {label: 'Completed task', important: true, id: 1},
            {label: 'Editing task', important: true, id: 2},
            {label: 'Active task', important: true, id: 3},
        ]
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id)
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]
            return {
                todoData: newArray
            }
        })
    }

    render() {
        return (
            <section className='todoapp'>
                <NewTaskForm />
                <section className='main'>
                    <TaskList
                        todos={this.state.todoData}
                        onDeleted={ this.deleteItem } />
                    <Footer toDo={1}/>
                </section>
            </section>
        );
    }


};
