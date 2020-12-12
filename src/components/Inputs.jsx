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
  color: var(--text-default);
  margin-right: 0.2rem;
  width: 100%;
  background-color: var(--input-bg);
  padding-left: 0.25rem;
  line-height: 0.5;
  font-weight: 300;
  font-style: italic;
  font-size: 0.75rem;

  &::placeholder {
    opacity: 1;
    font-style: italic;
    font-weight: 600;
  }
`

export const Editor = styled.textarea.attrs({ type: 'text' })`
  background-color: var(--input-bg);
  resize: none;
  border: none;
  border-radius: 1px;
  color: var(--text-default);
  font-weight: bold;
  padding: 0.5rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 12px;
`

export const Btn = styled.button`
  justify-self: left;
  color: var(--text-default);
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
    color: var(--accent);
    opacity: 50%;
  }
  &[disabled],
  &:disabled {
    cursor: unset;
    opacity: 1;
    &:hover {
      color: var(--text-default);
    }
  }
`
export const GroBtn = styled(Btn)`

  transition: font-size 0.1s;
  &:hover {
    font-size: 1.4rem;
  }
`

const defaultHeightLimit = 750 // px

export function MdEditor(props) {
  const { heightLimit } = props
  const ref = React.useRef()
  React.useLayoutEffect(() => {
    if (!ref.current) return
    // Set the textarea's height based on amount of content
    ref.current.style.minHeight = `${Math.min(ref.current.scrollHeight, heightLimit || defaultHeightLimit)}px`
  })
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

  return <Editor {...props} ref={ref} contenteditable="true" type="text" />
}
