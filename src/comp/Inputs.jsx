import React from 'react'
import styled from 'styled-components'

export const InputField = styled.input.attrs(
  (props) => ({
    className: 'inputField',
    type: props.type || 'text',
  }),
)`
  border: none;
  border-radius: 1px;
  color: #efefef;
  margin-right: 0.2rem;
  width: 100%;
  background-color: #ffffff05 ;
  padding-left: 0.25rem;
  line-height: 0.5;
  font-weight: 300;
  font-style: italic;
  font-size: 0.75rem;

  &::placeholder {
    opacity: 0.33;
    font-style: italic;
    font-weight: 600;
  }
`

export const Editor = styled.textarea.attrs({ type: 'text' })`
  flex: 1;
  background-color: #ffffff05 ;
  resize: none;
  min-width: 100%;
  min-height: 10rem;
  border: none;
  border-radius: 1px;
  /* border-left: 2px solid goldenrod; */
  color: #efefef;
  font-weight: bold;
  padding: 0.5rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 12px;
`

export const Btn = styled.button`
  justify-self: left;
  color: #efefef;
  font-weight: 700;
  background: none;
  border: none;
  border-radius: 1px;
  width: fit-content;
  white-space: nowrap;
  padding: 0.25rem;
  font-size: 1.2rem;
  line-height: 1.4rem;

  &:hover {
    color: goldenrod;
    opacity: 50%;
  }
  &[disabled],
  &:disabled {
    cursor: unset;
    opacity: 0.33;
    &:hover {
      color: #efefef;
    }
  }
`
export const GroBtn = styled(Btn)`

  transition: font-size 0.1s;
  &:hover {
    font-size: 1.4rem;
  }
`

export function MdEditor(props) {
//   const handlePaste = (e) => {
//     const clip = e.clipboardData || window.clipboardData
//     const data = clip.files.item('Image')
//     if(data) {
//
//       console.log(data)
//
//       // Stop data actually being pasted into div
//       e.stopPropagation()
//       e.preventDefault()
//     }
//
//     // Do whatever with pasteddata
//   }

  return <Editor {...props} contenteditable="true" type="text" />
}
