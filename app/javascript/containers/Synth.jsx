import React from 'react'
import Tone from 'tone'

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    let autoFilter = new Tone.AutoFilter({
      frequency: 1,
      type: 'sine',
      depth: 1,
      baseFrequency: 200,
      octaves: 2.6,
      filter: {
        type: 'lowpass',
        rolloff: -12,
        Q: 1
      }
    })//.toMaster()

    let feedbackDelay = new Tone.FeedbackDelay({
      delayTime: '32n',
      maxDelay: 10
    })

    let tremolo = new Tone.Tremolo({
      frequency: 3,
      type: 'sine',
      depth: 2,
      spread: 180
    })

    let distortion = new Tone.Distortion({
      distortion: 1,
      oversample: '4x'
    })

    let autoPanner = new Tone.AutoPanner({
      frequency: 1,
      type: 'sine',
      depth: 1
    })

    let autoWah = new Tone.AutoWah({
      baseFrequency: 100,
      octaves: 6,
      sensitivity: 0,
      Q: 2,
      gain: 2,
      follower: {
        attack: 0.3,
        release: 0.5
      }
    })

    let bitCrusher = new Tone.BitCrusher({
      bits: 4
    })

    let chebyshev = new Tone.Chebyshev({
      order: 50,
      oversample: 'none'
    })

    let chorus = new Tone.Chorus({
      frequency: 1.5,
      delayTime: 3.5,
      depth: 0.7,
      type: 'sine',
      spread: 180
    })

    let convolver = new Tone.Convolver({
      onload: Tone.noOp,
      normalize: true
    })

    let effect = new Tone.Effect({
      wet: 1
    })

    let feedbackEffect = new Tone.FeedbackEffect({
      feedback: 0.125
    })

    let freeverb = new Tone.Freeverb({
      roomSize: 0.7,
      dampening: 3000
    })

    let jcReverb = new Tone.JCReverb({
      roomSize: 0.5
    })

    let phaser = new Tone.Phaser({
      frequency: 0.5,
      octaves: 3,
      stages: 10,
      Q: 10,
      baseFrequency: 350
    })

    let pingPongDelay = new Tone.PingPongDelay({
      delayTime: 0.25,
      maxDelayTime: 1
    })

    let pitchShift = new Tone.PitchShift({
      pitch: 0,
      windowSize: 0.1,
      delayTime: 0,
      feedback: 0
    })

    let reverb = new Tone.Reverb({
      decay: 1.5,
      preDelay: 0.01
    })

    let stereoWidener = new Tone.StereoWidener({
      width: 0.5
    })

    let vibrato = new Tone.Vibrato({
      maxDelay: 0.005,
      frequency: 5,
      depth: 0.1,
      type: 'sine'
    })




  render() {
    return (
      <div>
        <div onClick={this.startSynth}>Start</div>
        <div onClick={this.toggleFilter}>Filter</div>
      </div>
    )
  }
}
