import { gql, useQuery } from '@apollo/client'
import {
  useAuth,
} from 'hook'
import React from 'react'
import {
  Route, Switch, useParams,
} from 'react-router-dom'
import {
  BlogForm,
} from './BlogForm'
import { BlogItem } from './BlogItem'
import {
  BlogList,
} from './BlogList'
import {
  ColBx,
} from './Layouts'

const getPost = gql`
  query MyQuery($id: ID!) {
    getPost(id: $id) {
      blogID
      content
      createdAt
      title
      owner
      id
      updatedAt
    }
  }
  `
function Thing() {
  const { id } = useParams()
  const {
    data,
    error,
  } = useQuery(getPost, { variables: { id } })

  if (!data) return null
  if (error) return null

  return (<BlogItem {...data.getPost} />)
}

export function Blog() {
  const isAuth = useAuth()

  return (
    <ColBx>
      <Switch>
        <Route path="/blog/:id">
          <Thing />
        </Route>
        <Route path="/blog">
          { isAuth && <BlogForm /> }
          <BlogList />
        </Route>
      </Switch>
    </ColBx>
  )
}
