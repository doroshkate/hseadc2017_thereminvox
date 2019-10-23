import React from 'react'
import Tone from 'tone'
import _ from 'lodash'
import NoiseControll from '../components/NoiseControll'

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    var white = new Tone.Noise('white')
    let pink = new Tone.Noise('pink')
    let brown = new Tone.Noise('brown')

    let whiteGain = new Tone.Gain(1)
    let pinkGain = new Tone.Gain(1)
    let brownGain = new Tone.Gain(1)

    let whiteDistortion = new Tone.Distortion()
    let pinkDistortion = new Tone.Distortion()
    let brownDistortion = new Tone.Distortion()

    var autoWhite = new Tone.AutoFilter({
      frequency: '8m',
      min: 800,
      max: 15000
    }).connect(Tone.Master)
    autoWhite.start()
    autoWhite.wet.value = 0.5
    var autoPink = new Tone.AutoFilter({
      frequency: '2m',
      min: 800,
      max: 19000
    }).connect(Tone.Master)
    autoPink.start()
    autoPink.wet.value = 0.5
    var autoBrown = new Tone.AutoFilter({
      frequency: '4m',
      min: 800,
      max: 20000
    }).connect(Tone.Master)
    autoBrown.wet.value = 0.5
    autoBrown.start()

    white.connect(autoWhite)
    brown.connect(autoBrown)
    pink.connect(autoPink)

    white.chain(whiteDistortion, whiteGain, Tone.Master)
    pink.chain(pinkDistortion, pinkGain, Tone.Master)
    brown.chain(brownDistortion, brownGain, Tone.Master)

    this.state = {
      playing: false,
      showing: 'white',
      white: {
        inst: white,
        gain: whiteGain,
        dist: whiteDistortion,
        auto: autoWhite
      },
      pink: {
        inst: pink,
        gain: pinkGain,
        dist: pinkDistortion,
        auto: autoPink
      },
      brown: {
        inst: brown,
        gain: brownGain,
        dist: brownDistortion,
        auto: autoBrown
      }
    }

    _.bindAll(
      this,
      'start',
      'switchNoise',
      'handleVolume',
      'handlePlayback',
      'handleDistortion',
      'handleRestart'
    )
  }

  start() {
    if (!this.state.playing) {
      this.state.white.inst.start()
      this.state.pink.inst.start()
      this.state.brown.inst.start()
    } else {
      this.state.white.inst.stop()
      this.state.pink.inst.stop()
      this.state.brown.inst.stop()
    }
    this.setState({
      playing: !this.state.playing
    })
  }

  switchNoise(type) {
    this.setState({
      showing: type
    })
  }

  handleVolume(value, noiseType) {
    let noise = this.state[`${noiseType}`]
    noise.gain.gain.value = value / 100
    this.setState({ [`${noiseType}`]: noise })
  }

  handlePlayback(value, noiseType) {
    let noise = this.state[`${noiseType}`]
    noise.inst._playbackRate = value / 100
    this.setState({ [`${noiseType}`]: noise })
  }

  handleRestart() {
    if (this.state.playing) {
      this.state.white.inst.stop()
      this.state.pink.inst.stop()
      this.state.brown.inst.stop()
      this.state.white.inst.start()
      this.state.pink.inst.start()
      this.state.brown.inst.start()
    }
  }

  handleDistortion(value, noiseType) {
    let noise = this.state[`${noiseType}`]
    noise.auto.wet.value = value / 100
    this.setState({ [`${noiseType}`]: noise })
  }

  render() {
    return (
      <div className="appWrapper">
        <div className="hands"></div>
        <div className="booya"></div>
        <div className="switchWrapper" onClick={this.start}>
          POWER
          <div
            className={this.state.playing ? 'switch active' : 'switch inactive'}
          >
            <div className="switchItem"></div>
          </div>
        </div>
        <div className="noiseControlls">
          <div className="noisePickerWrapper">
            <div
              className={
                this.state.showing == 'white'
                  ? 'noisePicker active'
                  : 'noisePicker'
              }
              onClick={() => this.switchNoise('white')}
            >
              White
            </div>
            <div
              className={
                this.state.showing == 'pink'
                  ? 'noisePicker active'
                  : 'noisePicker'
              }
              onClick={() => this.switchNoise('pink')}
            >
              Pink
            </div>
            <div
              className={
                this.state.showing == 'brown'
                  ? 'noisePicker active'
                  : 'noisePicker'
              }
              onClick={() => this.switchNoise('brown')}
            >
              Brown
            </div>
          </div>
          {this.state.showing == 'white' && (
            <NoiseControll
              noise="white"
              volume={this.state.white.gain.gain.value * 100}
              playback={this.state.white.inst._playbackRate * 100}
              distortion={this.state.white.auto.wet.value * 100}
              handleVolume={this.handleVolume}
              handlePlayback={this.handlePlayback}
              handleDistortion={this.handleDistortion}
              handleRestart={this.handleRestart}
            />
          )}
          {this.state.showing == 'pink' && (
            <NoiseControll
              noise="pink"
              volume={this.state.pink.gain.gain.value * 100}
              playback={this.state.pink.inst._playbackRate * 100}
              distortion={this.state.pink.auto.wet.value * 100}
              handleVolume={this.handleVolume}
              handlePlayback={this.handlePlayback}
              handleDistortion={this.handleDistortion}
              handleRestart={this.handleRestart}
            />
          )}
          {this.state.showing == 'brown' && (
            <NoiseControll
              noise="brown"
              volume={this.state.brown.gain.gain.value * 100}
              playback={this.state.brown.inst._playbackRate * 100}
              distortion={this.state.brown.auto.wet.value * 100}
              handleVolume={this.handleVolume}
              handlePlayback={this.handlePlayback}
              handleDistortion={this.handleDistortion}
              handleRestart={this.handleRestart}
            />
          )}
        </div>
      </div>
    )
  }
}
