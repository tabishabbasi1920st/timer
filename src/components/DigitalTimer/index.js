import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerMinute: 25,
    timerSecond: 59,
    isTimerRunning: false,
  }

  startTimer = () => {
    this.timerRunningId = setInterval(() => {
      const {timerSecond} = this.state
      if (timerSecond === 0) {
        this.setState({timerSecond: 60})
      }

      this.setState(prevState => ({
        timerSecond: prevState.timerSecond - 1,
      }))
    }, 1000)
  }

  onClickStartOrStopButton = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
      this.startTimer()
    } else {
      this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
      clearInterval(this.timerRunningId)
    }
  }

  onClickResetButton = () => {
    this.setState({isTimerRunning: false, timerMinute: 25, timerSecond: 59})
    clearInterval(this.timerRunningId)
  }

  onClickDecrementButton = () => {
    this.setState(prevState => ({timerMinute: prevState.timerMinute - 1}))
  }

  onClickIncrementButton = () => {
    this.setState(prevState => ({timerMinute: prevState.timerMinute + 1}))
  }

  render() {
    const {timerMinute, timerSecond, isTimerRunning} = this.state

    const stringifiedMinutes = timerMinute > 9 ? timerMinute : `0${timerMinute}`
    const stringifiedSeconds = timerSecond > 9 ? timerSecond : `0${timerSecond}`

    const playPauseIconAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="app-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>

        <div className="over-all-container">
          <div className="display-container">
            <div className="timer-display">
              <h1 className="timer">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="running-pause-text">
                {isTimerRunning ? 'Running' : 'Pause'}
              </p>
            </div>
          </div>

          <div className="timer-controller-container">
            <div className="start-and-reset-button-container">
              <button
                className="start-reset-button"
                type="button"
                onClick={this.onClickStartOrStopButton}
              >
                <img
                  src={
                    isTimerRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={playPauseIconAltText}
                  className="play-icon"
                />
                <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
              </button>

              <button
                type="button"
                className="start-reset-button"
                onClick={this.onClickResetButton}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset-icon"
                />
                <p>Reset</p>
              </button>
            </div>
            <p className="set-timer-limit-para">Set Timer limit</p>
            <div className="increment-decrement-buttons-container">
              <button
                disabled={isTimerRunning}
                onClick={this.onClickDecrementButton}
                type="button"
                className="decrement-button"
              >
                -
              </button>
              <div className="small-display">
                <h1 className="small-display-heading">{timerMinute}</h1>
              </div>
              <button
                disabled={isTimerRunning}
                onClick={this.onClickIncrementButton}
                type="button"
                className="increment-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
