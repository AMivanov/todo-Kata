import React from "react";

import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";


import './app.css'


export default class App extends React.Component {

    maxId = 1

    state = {
        todoData: [this.createTodoItem('Completed task'),
            this.createTodoItem('Editing task'),
            this.createTodoItem('Active task')],
        term: ' ',
        filter: 'all'
    }

    createTodoItem(label) {
        return {
            label, important: false, completed: false, editing: false, id: this.maxId++,
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id)
            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
            return {
                todoData: newArray
            }
        })
    }

    onToggleCompleted = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id)

            const oldItem = todoData[idx]
            const newItem = {
                ...oldItem, completed: !oldItem.completed
            }

            const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
            return {
                todoData: newArray
            }
        })
    }

    onToggleEdit = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id)
            const oldItem = todoData[idx]
            const newItem = {
                ...oldItem, editing: !oldItem.editing
            }

            const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
            return {
                todoData: newArray
            }
        })
    }

    onLabelChange = (todoData, id, e, text) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id)

            const oldItem = todoData[idx]

            const newItem = {...oldItem, label: ` ${text}`}

            const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        const newItem = {
            label: text, important: false, completed: false, editing: false, id: this.maxId++,
        }

        this.setState(({todoData}) => {
            const newArr = [...todoData, newItem]
            return {
                todoData: newArr
            }
        })
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    }

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.completed);
            case 'completed':
                return items.filter((item) => item.completed);
            default:
                return items;
        }
    }

    search(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    deleteItemCompleted = (e) => {
        this.setState(({todoData}) => {
            const clearList = todoData.filter((el) => !el.completed)
            return {
                todoData: clearList
            }
        })
    }

    render() {

        const {todoData, term, filter} = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter)
        const completedCount = todoData
            .filter((el) => el.completed).length
        const todoCount = todoData.length - completedCount

        return (<section className='todoapp'>
            <NewTaskForm onItemAdded={this.addItem}/>
            <section className='main'>
                <TaskList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleCompleted={this.onToggleCompleted}
                    onToggleEdit={this.onToggleEdit}
                    onLabelChange={this.onLabelChange}/>
                <Footer toDo={todoCount}
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                        onDeleteCompleted={this.deleteItemCompleted}
                />
            </section>
        </section>);
    }


};
