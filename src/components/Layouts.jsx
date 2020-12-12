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
  min-height: 60px;
  padding-bottom: 1.25rem;
`

export const RowBx = styled.div`
  display: flex;
  flex-direction: row;
  ${({ reverse }) => (reverse
    ? 'flex-direction: row-reverse;' : null)}
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
`

export const SpcBtwnRowBx = styled(RowBx)`
  justify-content: space-between;
`
export const ColBx = styled.div`
  display: flex;
  flex-direction: column;
  ${({ reverse }) => (reverse
    ? 'flex-direction: column-reverse;' : null)}
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
`

export const GrowPane = styled.div`
    overflow: hidden;
    transition: height 0.25s;
    display: flex;
    flex-direction: column;
    height: ${({ expand, height = '132px' }) => (expand ? height : '30px')};
    ${({ expand }) => expand
    && `& button {
          padding-left: 0;
        }`}
`
