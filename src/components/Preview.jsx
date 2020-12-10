import { useMd } from '@hooks'
import DOMPurify from 'dompurify'
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
  line-height: 1.5rem;
  vertical-align: bottom;
  letter-spacing: 0.01rem;

  & p, 
  & ul, 
  & ol {
    margin-bottom: 1rem;
  }

  & ol, 
  & ul {
    margin-left: 2rem;
    padding: 1rem;
  }
  
  & code {
    background-color: #00000033;
    border-radius: 2px;
    padding: 0.15rem;
    font-size: 1.1rem;
  }

  & p > img ,
  & pre {
    code {
      background-color: unset;
    }

    font-family: monospace;
    border-radius: 2px;
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.25rem;
    background-color: #00000033;
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

`

export function Preview({ mdInput }) {
  const md = useMd()
  const previewHTML = () => ({ __html: md.render(DOMPurify.sanitize(mdInput)) })

  return (
    <PreviewContainer dangerouslySetInnerHTML={previewHTML()} />
  )
}
