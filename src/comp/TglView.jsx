import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import styled from 'styled-components'

const Cntnr = styled.div`
        display: flex;
        flex-direction: ${({ dir }) => dir || 'row'};
        flex: 1;
`

export function TglView({ children, ...otherProps }) {
  const [shouldSplit, setShouldSplit] = useState(false)
  useHotkeys('ctrl+r', () => setShouldSplit((prev) => !prev))

  if (!children || children.length !== 2) {
    throw new Error('ToggleSplitView requires exactly two child components!')
  }

  return (
    <Cntnr {...otherProps}>
      {
            shouldSplit
              ? (
                <>
                  {children[0]}
                  {children[1]}
                </>
              )
              : (
                children[0]
              )
        }
    </Cntnr>
  )
}
