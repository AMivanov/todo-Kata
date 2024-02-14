import React from 'react'

import './timer-container.css'

export default class TimerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: JSON.parse(sessionStorage.getItem(`${this.props.id}`)).isPlaying || false,
      minutes: JSON.parse(sessionStorage.getItem(`${this.props.id}`)).minutes || props.minutes || 0,
      seconds: JSON.parse(sessionStorage.getItem(`${this.props.id}`)).seconds || props.seconds || 0,
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.isPlaying) {
        this.handleTick()
      }
    }, 1000)
  }

  componentWillUnmount() {
    this.clearInterval()
    sessionStorage.setItem(`${this.props.id}`, JSON.stringify({ minutes: this.state.minutes, seconds: this.state.seconds, isPlaying: this.state.isPlaying }))
  }

  clearInterval = () => {
    clearInterval(this.intervalId)
  }

  handlePlay = () => {
    this.setState({ isPlaying: true })
  }

  handlePause = () => {
    this.setState({ isPlaying: false })
    // this.clearInterval()
  }

  handleTick = () => {
    console.log(this.state)
    const { minutes, seconds } = this.state
    if (seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }))
    } else if (minutes > 0 && seconds === 0) {
      this.setState((prevState) => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
      }))
    }
  }

  render() {
    const { minutes, seconds } = this.state
    return (
      <span className="task_description">
        <button
          className="icon icon-play"
          onClick={this.handlePlay}
        />
        <button
          className="icon icon-pause"
          onClick={this.handlePause}
        />
        <span className="task_timer">
          {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </span>
      </span>
    )
  }
}