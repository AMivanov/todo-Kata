import React from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

import './create-tasks-timer.css'

export default class CreateTasksTimer extends React.Component {
  constructor(props) {
    super(props)
    this.currentDate = new Date()
    this.state = {
      timeCreated: formatDistanceToNowStrict(props.date || this.currentDate, { includeSeconds: true }),
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      timeCreated: formatDistanceToNowStrict(this.props.date || this.currentDate, {
        includeSeconds: true,
      }),
    })
  }

  render() {
    return <span className="created">created {this.state.timeCreated} ago</span>
  }
}
