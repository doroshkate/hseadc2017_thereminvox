import React from 'react'
import Tone from 'tone'
//import Menubar from '../components/Menubar'

export default class Thereminvox extends React.Component {
  constructor(props) {
    super(props)

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    let oscillator = audioContext.createOscillator()
    oscillator.type = 'square'

    let analyser = audioContext.createAnalyser()
    analyser.fftsize = 2048
    oscillator.connect(analyser)

    this.state = {
      audioContext: audioContext,
      oscillator: oscillator,
      analyser: analyser,
      playing: false,
      x: 0,
      y: 0,
      fftData: []
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleStartOrStopClick = this.handleStartOrStopClick.bind(this)
    this.changeFrequency = this.changeFrequency.bind(this)
    this.changeDetune = this.this.changeDetune.bind(this)
    this.changeVisualisation = this.changeVisualisation.bind(this)
    this.handleSynthPlay = this.handleSynthPlay.bind(this)
  }

  componentDidMount() {
    //console.log('Ye')
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove(e) {
    //console.log(e.clientX, e.clientY)
    this.setState({
      x: e.clientX,
      y: e.clientY
    })

    this.changeFrequency()
    this.changeDetune()
    this.changeVisualisation()
  }

  handleStartOrStopClick() {
    let { playing } = this.state

    if (playing) {
      this.handleStop()
    } else {
      this.handleStart()
    }
  }

  handleSynthPlay() {
    //wip
    console.log('Ye')
    let synth = new Tone.Synth().toMaster()
    //synth.triggerAttackRelease('C4', '8n')

    let pattern = new Tone.Pattern(
      function(time, note) {
        synth.triggerAttackRelease(note, 0.25)
      },
      ['C4', 'D4', 'E4', 'G4', 'A4']
    )

    pattern.start(0)
    one.Transport.bpm.value = 220
    Tone.Transport.start()
  }

  handleStart() {
    let { audioContext, oscillator, x, y } = this.state

    oscillator = audioContext.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(x, audioContext.currentTime)
    oscillator.connect(audioContext.destination)
    oscillator.start()

    analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048
    oscillator.connect(analyser)

    this.setState({
      oscillator: oscillator,
      playing: true
    })
  }

  handleStop() {
    let { oscillator } = this.state
    oscillator.stop()

    this.setState({
      oscillator: oscillator,
      playing: false
    })
  }

  changeFrequency() {
    let { audioContext, oscillator, x, y } = this.state
    oscillator.frequency.setValueAtTime(y, audioContext.currentTime)
  }

  changeDetune() {
    let { audioContext, oscillator, x, y } = this.state
    oscillator.detune.setValueAtTime(y, audioContext.currentTime)
  }

  changeVisualisation() {
    const { analyse, playingr } = this.setState

    if (playing) {
      const bufferLengh = analyser.frequencyBinCount
      let dataArray = new Unit8Array(bufferLengh)
      analyser.getByteTimeDomainData(dataArray)

      //console.log(bufferLengh, fftData, dataArray)

      this.setState({
        fftData: dataArray
      })
    }
  }

  render() {
    const { playing, analyser, fftData } = this.state
    let button = 'Start'

    if (playing) {
      button = 'Stop'
    }

    let elements = []

    console.log(state)

    if (fftData != undefined) {
      fftData.map(function(fftParam, i) {
        elements.push(
          <div
            key={i}
            className="analyserCol"
            style={{ height: fftParam + 'px' }}
          />
        )
      })
    }

    return (
      <div>
        <div onClick={this.handleSynthPlay}>Synth</div>
        <div onClick={this.handleStartOrStopClick}>{button}</div>
        <div className="analyser">{elements}</div>
      </div>
    )
  }
}
