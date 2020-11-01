import {
  useAuth,
} from 'hook';
import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import {
  BlogForm,
} from './BlogForm';
import {
  BlogList,
} from './BlogList';
import {
  ColBx,
} from './Layouts';
import { RoguieCanvas } from './RoguieCanvas';

export function MainContent() {
  const isAuth = useAuth();
  return (
    <Switch>
      <Route path="/blog">
        <ColBx>
          { isAuth && <BlogForm /> }
          <BlogList />
        </ColBx>
      </Route>
      <Route path="/">
        <RoguieCanvas />
      </Route>
    </Switch>
  );
}
