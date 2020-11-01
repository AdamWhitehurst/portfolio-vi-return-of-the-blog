import React from 'react';
import {
  BrowserRouter as Router, Link,
} from 'react-router-dom';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import {
  BigLabel,

  GroBtn, Header,

  LoginPane,
  MainContent,

  MainSidebarSplit, Sgntr,

  Sidebar,
} from './comp';

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
        </Sidebar>
        <MainContent />
      </MainSidebarSplit>
      {/* Elements outside of flow */}
      <Sgntr />
      <ToastsContainer store={ToastsStore} />
    </Router>
  );
}

export default App;
