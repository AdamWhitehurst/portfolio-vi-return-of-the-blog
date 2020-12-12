import {
  BigLabel,

  GroBtn, Header,

  LoginPane,
  MainContent,

  MainSidebarSplit,

  PrefsPane, Sgntr,

  Sidebar,
} from '@components'
import React from 'react'
import {
  BrowserRouter as Router, Link,
} from 'react-router-dom'
import { ToastsContainer, ToastsStore } from 'react-toasts'

function App() {
  return (
    <Router>
      <Header>
        <BigLabel>
          A Blog
        </BigLabel>
      </Header>
      <MainSidebarSplit>
        <Sidebar>
          <Link to="/">
            <GroBtn>
              HOME
            </GroBtn>
          </Link>
          <Link to="/blog">
            <GroBtn>
              BLOG
            </GroBtn>
          </Link>
          <LoginPane />
          <PrefsPane />
        </Sidebar>
        <MainContent />
      </MainSidebarSplit>
      {/* Elements outside of flow */}
      <Sgntr />
      <ToastsContainer store={ToastsStore} />
    </Router>
  )
}

export default App
