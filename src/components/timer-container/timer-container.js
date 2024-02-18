import React from 'react'
import './timer-container.css'
import PropTypes from 'prop-types'

export default class TimerContainer extends React.Component {
  static defaultProps = {
    id: 1,
    minutes: 0,
    seconds: 0,
    inactiveTime: 0,
    completed: false,
  }

  static propTypes = {
    id: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    inactiveTime: PropTypes.number,
    completed: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      isPlaying: JSON.parse(sessionStorage.getItem(`${this.props.id}`))?.isPlaying || false,
      minutes: JSON.parse(sessionStorage.getItem(`${this.props.id}`))?.minutes || props.minutes || 0,
      seconds: JSON.parse(sessionStorage.getItem(`${this.props.id}`))?.seconds || props.seconds || 0,
    }
  }

  componentDidMount() {
    if (this.state.isPlaying) {
      const { minutes, seconds } = this.state
      const { inactiveTime } = this.props
      const totalInactiveSeconds = inactiveTime > 0 ? inactiveTime : 0
      const totalSeconds = minutes * 60 + seconds - totalInactiveSeconds
      const updatedMinutes = Math.floor(totalSeconds / 60)
      const updatedSeconds = totalSeconds % 60

      this.setState({
        minutes: updatedMinutes,
        seconds: updatedSeconds,
      })
    }
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

  componentDidUpdate(prevProps) {
    if (prevProps.completed !== this.props.completed) {
      if (this.props.completed) {
        this.handlePause()
      }
    }
  }

  handlePlay = () => {
    this.setState({ isPlaying: true })
  }

  handlePause = () => {
    this.setState({ isPlaying: false })
  }

  handleTick = () => {
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