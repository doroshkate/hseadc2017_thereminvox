import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import PlaySwitch from '../components/PlaySwitch'
import Distortion from '../components/effects/Distortion'

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
    })

    let feedbackDelay = new Tone.FeedbackDelay({
      delayTime: '32n',
      maxDelay: 10
    })

    let tremolo = new Tone.Tremolo({
      frequency: 3,
      type: 'sine',
      depth: 5,
      spread: 160
    })

    let distortion = new Tone.Distortion({
      distortion: 1,
      oversample: '3x'
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

    autoFilter.wet.value = 0
    feedbackDelay.wet.value = 0
    tremolo.wet.value = 0
    distortion.wet.value = 0
    autoPanner.wet.value = 0
    autoWah.wet.value = 0
    bitCrusher.wet.value = 0
    chebyshev.wet.value = 0
    chorus.wet.value = 0
    convolver.wet.value = 0
    feedbackEffect.wet.value = 0
    freeverb.wet.value = 0
    jcReverb.wet.value = 0
    phaser.wet.value = 0
    pingPongDelay.wet.value = 0
    pitchShift.wet.value = 0
    reverb.wet.value = 0
    stereoWidener.wet.value = 0
    vibrato.wet.value = 0

    let synth = new Tone.PolySynth()

    synth.chain(
      autoFilter,
      feedbackDelay,
      tremolo,
      distortion,
      autoPanner,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      convolver,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pingPongDelay,
      pitchShift,
      reverb,
      stereoWidener,
      vibrato,
      Tone.Master
    )

    let loop1 = new Tone.Loop(function(time) {
      synth.triggerAttackRelease('C2', '8n', time)
    }, '4n')

    let loop2 = new Tone.Loop(function(time) {
      synth.triggerAttackRelease('E2', '32n', time)
    }, '32n')

    let loop3 = new Tone.Loop(function(time) {
      synth.triggerAttackRelease('D2', '1n', time)
    }, '1n')

    let loop4 = new Tone.Loop(function(time) {
      synth.triggerAttackRelease('A2', '16n', time)
    }, '16n')

    this.state = {
      lastChange: {
        randomDelay: 100,
        lastChange: Date.now()
      },
      autoFilter: {
        effect: autoFilter,
        wet: 0,
        on: false
      },
      feedbackDelay: {
        effect: feedbackDelay,
        wet: 0,
        on: false
      },
      tremolo: {
        effect: tremolo,
        wet: 0,
        on: false
      },
      distortion: {
        effect: distortion,
        wet: 0,
        on: false
      },
      autoPanner: {
        effect: autoPanner,
        wet: 0,
        on: false
      },
      autoWah: {
        effect: autoWah,
        wet: 0,
        on: false
      },
      bitCrusher: {
        effect: bitCrusher,
        wet: 0,
        on: false
      },
      chebyshev: {
        effect: chebyshev,
        wet: 0,
        on: false
      },
      chorus: {
        effect: chorus,
        wet: 0,
        on: false
      },
      convolver: {
        effect: convolver,
        wet: 0,
        on: false
      },
      feedbackEffect: {
        effect: feedbackEffect,
        wet: 0,
        on: false
      },
      freeverb: {
        effect: freeverb,
        wet: 0,
        on: false
      },
      jcReverb: {
        effect: jcReverb,
        wet: 0,
        on: false
      },
      phaser: {
        effect: phaser,
        wet: 0,
        on: false
      },
      pingPongDelay: {
        effect: pingPongDelay,
        wet: 0,
        on: false
      },
      pitchShift: {
        effect: pitchShift,
        wet: 0,
        on: false
      },
      reverb: {
        effect: reverb,
        wet: 0,
        on: false
      },
      stereoWidener: {
        effect: stereoWidener,
        wet: 0,
        on: false
      },
      vibrato: {
        effect: vibrato,
        wet: 0,
        on: false
      },
      synth: {
        instrument: synth,
        on: false
      },
      loop1: {
        loop: loop1,
        on: false
      },
      loop2: {
        loop: loop2,
        on: false
      },
      loop3: {
        loop: loop3,
        on: false
      },
      loop4: {
        loop: loop4,
        on: false
      }
    }

    _.bindAll(
      this,
      'toggleLoop',
      'toggleEffect',
      'changeEffectWetValue',
      'changeDistortionValue',
      'changeStereoWidenerValue'
    )

    Tone.Transport.bpm.value = 20
    Tone.Transport.start()
  }

  //this.setState({
  //synth: synth
  //})

  componentDidMount() {}

  getRandomArbitrary(max, min) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  generateRandom() {
    const { lastChange, randomDelay } = this.state

    if (Date.now() - lastChange >= randomDelay) {
      this.setState({
        lastChange: Date.now(),
        randomDelay: this.getRandomArbitrary(100, 3000)
      })
    }
  }

  toggleLoop(loopName) {
    let { loop, on } = this.state[loopName]

    on == true ? loop.stop() : loop.start('0m')

    this.setState({
      [`${loopName}`]: {
        loop: loop,
        on: !on
      }
    })
  }

  toggleEffect(effectName) {
    let { effect, wet, on } = this.state[effectName]

    effect.wet.value = on == true ? 0 : wet

    on = !on

    this.setState({
      [`${effectName}`]: {
        effect,
        wet,
        on
      }
    })
  }

  changeEffectWetValue(effectName, value) {
    let { effect, wet, on } = this.state[effectName]

    effect.wet.value = on == true ? value : 0

    wet = value

    this.setState({
      [`${effectName}`]: {
        effect,
        wet,
        on
      }
    })
  }

  changeDistortionValue(effectName, value) {
    let { effect, wet, on } = this.state.distortion

    effect.distortion = value

    this.setState({
      distortion: {
        effect,
        wet,
        on
      }
    })
  }

  changeStereoWidenerValue(value) {
    let { effect, wet, on } = this.state.stereoWidener

    effect.stereoWidener = value

    this.setState({
      stereoWidener: {
        effect,
        wet,
        on
      }
    })
  }

  render() {
    let {
      distortion,
      synth,
      stereoWidener,
      loop1,
      loop2,
      loop3,
      loop4
    } = this.state
    let { toggleEffect } = this

    return (
      <div className="container">
        <div className="row">
          <PlaySwitch
            name="play"
            value={loop1.on}
            handleToggleClick={() => this.toggleLoop('loop1')}
          />
          <PlaySwitch
            name="play"
            value={loop2.on}
            handleToggleClick={() => this.toggleLoop('loop2')}
          />
          <PlaySwitch
            name="play"
            value={loop3.on}
            handleToggleClick={() => this.toggleLoop('loop3')}
          />
          <PlaySwitch
            name="play"
            value={loop4.on}
            handleToggleClick={() => this.toggleLoop('loop4')}
          />

          <h1 className="synthName">Super Synth 3000</h1>
        </div>

        <Distortion
          {...this.state.distortion}
          toggleEffect={() => toggleEffect('distortion')}
          changeEffectWetValue={this.changeEffectWetValue}
          changeDistortionValue={this.changeDistortionValue}
        />

        <FeedbackDelay
          {...this.state.feedbackDelay}
          toggleEffect={() => toggleEffect('feedbackDelay')}
          changeEffectWetValue={this.changeEffectWetValue}
          changeFeedbackDelayValue={this.changeFeedbackDelayValue}
        />

        <Chorus
          {...this.state.chorus}
          toggleEffect={() => toggleEffect('chorus')}
          changeEffectWetValue={this.changeEffectWetValue}
          changeFeedbackDelayValue={this.changeChorusValue}
        />

        <Reverb
          {...this.state.reverb}
          toggleEffect={() => toggleEffect('reverb')}
          changeEffectWetValue={this.changeEffectWetValue}
          changeFeedbackDelayValue={this.changeReverbValue}
        />
      </div>
    )
  }
}
