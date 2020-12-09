import React from 'react'
import {
  Route, Switch,
} from 'react-router-dom'
import { Blog } from './Blog'
import { RoguieCanvas } from './RoguieCanvas'

export function MainContent() {
  return (
    <Switch>
      <Route path="/blog">
        <Blog />
      </Route>
      <Route path="/roguie">
        <RoguieCanvas />
      </Route>
      <Route path="/">
        <RoguieCanvas />
      </Route>
    </Switch>
  )
}
