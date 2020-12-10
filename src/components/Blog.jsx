import { gql, useQuery } from '@apollo/client'
import {
  useAuth,
} from '@hooks'
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

const getPost = gql`query ListPosts($idTitle: String="") {
  listPosts(filter: {idTitle: {contains: $idTitle}}) {
    nextToken
    items {
      blogID
      content
      createdAt
      id
      owner
      title
      updatedAt
      idTitle
    }
  }
}`

function SinglePost({ idTitle }) {
  const {
    data,
    error,
  } = useQuery(getPost, { variables: { idTitle: idTitle.toLowerCase() } })
  if (!data) return null
  if (error) return null
  return (<BlogItem {...data?.listPosts?.items?.[0]} />)
}

function Thing() {
  const { idTitle } = useParams()
  if (!idTitle) {
    return 'null'
  }
  return <SinglePost idTitle={idTitle} />
}

export function Blog() {
  const isAuth = useAuth()

  return (
    <ColBx>
      <Switch>
        <Route path="/blog/:idTitle">
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
