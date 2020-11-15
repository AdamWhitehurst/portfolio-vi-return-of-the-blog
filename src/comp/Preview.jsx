import DOMPurify from 'dompurify'
import { useMd } from 'hook'
import React from 'react'
import styled from 'styled-components'

const PreviewContainer = styled.div`
flex: 1;
  border-radius: 1px;
  border-left: 2px solid goldenrod;
  color: #efefef;
  margin-top: 1rem;
  margin-left: 0.25rem;
  padding: 0.5rem 1.5rem;
  overflow: auto;
`

export function Preview({ mdInput }) {
  const md = useMd()
  const previewHTML = () => ({ __html: md.render(DOMPurify.sanitize(mdInput)) })

  return (
    <PreviewContainer dangerouslySetInnerHTML={previewHTML()} />
  )
}
