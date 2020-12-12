import React from 'react'
import styled from 'styled-components'

export const Highlight = styled.div`
  height: 6px;
  position: relative;
  top: 0px;
  left: -6px;
  line-height: 1.6;
  border-radius: 1px;
  background-color: darkcyan;
  z-index: -1;
  width: calc(100% + 12px);
`

export const InputHighlight = styled(Highlight)`
  top: -9px;
`

export const PostDate = styled.p`
  font-size: 0.75rem;
  font-style: italic;
  font-weight: 100;
  color: var(--text-default);
  opacity: 0.5;
  margin-top: 1rem;
  padding-left: 0.5rem;
  justify-self: right;
  text-align: right;
  white-space: nowrap;
`

export const Label = styled.label`
  margin: 0.2rem;
  white-space: nowrap;
  color: var(--accent);
  opacity: 0.33;
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 700;
`

export const BigLabel = styled.header`
margin-right: 0.2rem;
margin-top: 0.2rem;
line-height: 1.4rem;
font-weight: 700;
font-size: 2rem;
opacity: 1;
color: var(--text-default);
font-style: italic;
`

const InnerPostTitle = styled.header`
  color: var(--text-default);
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  margin-top: 1rem;
`

export const PostTitle = ({ children, ...props }) => (
  <InnerPostTitle {...props}>
    {children}
  </InnerPostTitle>
)
