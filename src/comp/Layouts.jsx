import styled from 'styled-components'

export const ThreeRowGrid = styled.div`
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 80fr 5fr;
  grid-gap: 0.25rem;
`

export const MainSidebarSplit = styled.div`
  display: grid;
  min-width: 640px;
  grid-template-columns: 1fr;
  @media only screen and (min-width: 815px) {
    grid-template-columns: 175px 10fr;
  }
  grid-gap: 0.5rem;
`

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  ${({ reverse }) => (reverse
    ? 'flex-direction: column-reverse;' : null)}
  /* align-items: flex-end; */
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  ${({ reverse }) => (reverse
    ? 'flex-direction: row-reverse;' : null)}
  align-items: flex-end;
  min-height: 65px;
  padding-bottom: 1.5rem;
`

export const RowBx = styled.div`
  display: flex;
  flex-direction: row;
  ${({ reverse }) => (reverse
    ? 'flex-direction: row-reverse;' : null)}
  padding: 0.25rem;
`

export const SpcBtwnRowBx = styled(RowBx)`
  justify-content: space-between;
`
export const ColBx = styled.div`
  display: flex;
  flex-direction: column;
  ${({ reverse }) => (reverse
    ? 'flex-direction: column-reverse;' : null)}
  padding: 0.25rem;
`
