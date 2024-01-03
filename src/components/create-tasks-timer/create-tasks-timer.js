import React from "react";
import {formatDistanceToNow} from "date-fns";

import './create-tasks-timer.css'

export default class CreateTasksTimer extends React.Component {

    constructor() {
        super();
        this.currentDate = new Date();
        this.state = {timeCreated: formatDistanceToNow(new Date(), { includeSeconds: true })}
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                this.tick()
            },
            1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            timeCreated: formatDistanceToNow(this.currentDate, {includeSeconds: true})
        })
    }

    render() {
        return (
            <span className='created'>created {this.state.timeCreated} ago</span>
        )
    }
}
