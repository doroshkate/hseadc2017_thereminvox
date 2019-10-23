import React from 'react'
import _ from 'lodash'
import Slider from 'react-slider'

export default class NoiseControll extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, 'handleVolume', 'handlePlayback', 'handleDistortion')
  }

  handleVolume(value) {
    this.props.handleVolume(value, this.props.noise)
  }

  handlePlayback(value) {
    this.props.handlePlayback(value, this.props.noise)
  }

  handleDistortion(value) {
    this.props.handleDistortion(value, this.props.noise)
  }

  render() {
    return (
      <div className="sliders">
        <div className="sliderWrapper volume">
          <div className="slider">
            <Slider
              value={this.props.volume}
              min={0}
              max={100}
              onChange={this.handleVolume}
              className="sliderTrack"
              thumbClassName="sliderThumb"
              trackClassName="sliderTrack"
              renderThumb={props => <div {...props}></div>}
              renderTrack={props => <div {...props}></div>}
            />
          </div>
          Volume
        </div>
        <div className="sliderWrapper">
          <div className="slider">
            <Slider
              value={this.props.playback}
              min={0}
              max={200}
              onChange={this.handlePlayback}
              onAfterChange={this.props.handleRestart}
              className="sliderTrack"
              thumbClassName="sliderThumb"
              trackClassName="sliderTrack"
              renderThumb={props => <div {...props}></div>}
              renderTrack={props => <div {...props}></div>}
            />
          </div>
          Playback Rate
        </div>
        <div className="sliderWrapper">
          <div className="slider">
            <Slider
              value={this.props.distortion}
              min={0}
              max={100}
              onChange={this.handleDistortion}
              className="sliderTrack"
              thumbClassName="sliderThumb"
              trackClassName="sliderTrack"
              renderThumb={props => <div {...props}></div>}
              renderTrack={props => <div {...props}></div>}
            />
          </div>
          Distortion
        </div>
      </div>
    )
  }
}
