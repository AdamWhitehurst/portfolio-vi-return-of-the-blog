import React from 'react'
import styled from 'styled-components'
import { Btn } from './Inputs'
import { RowBx } from './Layouts'

/* eslint-disable-next-line */
import('../wasm/roguie_bg.wasm').then((wasm) => wasm.__wbindgen_start());

export const WASMCanvas = styled.canvas`
    width: 640px;
    height: 400px;
    display: none;
`

const CanvasContainer = styled.div.attrs(({ id: 'canvas-container' }))`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
`
const RecordIcon = () => <span role="img" aria-label="start recording">🔴</span>
const StopRecordIcon = () => <span role="img" aria-label="stop recording">⬜</span>

const appendBlobAsVidTo = (blob, elem) => {
  // const container = document.createElement('div')
  // container.id = 'video-container'

  const url = URL.createObjectURL(blob)
  // const vid = document.createElement('video')
  // vid.src = url
  // vid.controls = true
  // container.appendChild(vid)

  const a = document.createElement('a')
  a.download = 'capture'
  a.href = url
  a.textContent = 'download capture'
  // container.appendChild(a)

  elem.appendChild(a)
}

export function RoguieCanvas() {
  // Okay we're doing a little hack here because bracket-lib bindgen does not
  // support reloading canvas elements. Therefore, we always have a canvas
  // element but we hide it until this Component is loaded.

  // Make a ref so that we can attach the canvas element to this Component in
  // the DOM
  const ref = React.useRef()
  const [recorder, setRecorder] = React.useState()

  React.useEffect(() => {
    // On load, this Component finds the canvas element, appends it to itself
    const canvasElem = document.getElementById('canvas')
    canvasElem.style.display = 'unset'
    ref.current.appendChild(canvasElem)

    // On unload, this Component reattaches the canvas element to the document
    // and does everything it can to make the element not exist without
    // unloading it.
    return () => {
      canvasElem.style.display = 'none'
      document.querySelector('body').appendChild(canvasElem)
    }
  })

  const startRecording = () => {
    // Not mounted?
    if (!ref.current) return

    // Find canvas element
    const canvas = document.querySelector('#canvas')
    // Save stream into a byte array
    const bytes = []
    // Grab element's MediaStream
    const stream = canvas.captureStream()
    // Create new recorder for that stream
    const rec = new MediaRecorder(stream)
    // Put stream's data into byte array
    rec.ondataavailable = (e) => {
      bytes.push(e.data)
    }
    // Export bytes as blob when done
    rec.onstop = () => {
      // https://javascript.info/blob
      // Set up saving logic for when recording is stopped
      appendBlobAsVidTo(
        new Blob(bytes, { type: 'video/webm' }),
        ref.current.querySelector('#roguie-btns'),
      )
    }
    rec.onerror = (e) => {
      // eslint-disable-next-line
      console.log('error:', e)
    }
    // Start recording
    rec.start()

    // Save recorder to state so user can control stop
    setRecorder(rec)
  }

  const stopRecording = () => {
    // Can't stop nothing!
    if (!recorder) return
    // Stop Recording (onstop will run)
    recorder.stop()
  }

  return (
    <CanvasContainer ref={ref}>
      <RowBx id="roguie-btns">
        <Btn onClick={startRecording}><RecordIcon /></Btn>
        <Btn onClick={stopRecording}><StopRecordIcon /></Btn>
        <p style={{ color: 'white' }}>
          <b>Note: This is a major WIP. Red circle records, White square stops record</b>
          <br />
          Press
          {'   '}
          <code>G</code>
          {'   '}
          to grab items.
          <br />
          Press
          {'   '}
          <code>.</code>
          {'   '}
          to descend when you find stairs.
          <br />
          <code>I</code>
          {'   '}
          opens inventory.
          <br />
          <code>D</code>
          {'   '}
          opens drop menu.
        </p>
      </RowBx>
    </CanvasContainer>
  )
}
