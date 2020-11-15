import { gql, useMutation } from '@apollo/client'
import { DateTime } from 'luxon'
import React from 'react'
import { ToastsStore } from 'react-toasts'
import { BlogForm } from './BlogForm'
import { GroBtn } from './Inputs'
import { PostDate, PostTitle } from './Labels'
import { Preview } from './Preview'

const DeleteIcon = () => (<span role="img" aria-label="delete">❌</span>)
const EditIcon = () => (<span role="img" aria-label="edit">🖊</span>)

const parseDate = (dt) => DateTime.fromISO(dt).toLocaleString(DateTime.DATETIME_FULL)

const updatePost = gql`
 mutation UpdatePost($blogID: ID!, $content: String!, $id: ID!, $title: String!) {
  updatePost(input: {blogID: $blogID, title: $title, id: $id, content: $content}) {
      id
      title
      content
      blogID
      createdAt
      updatedAt
    }
  }
`

export function BlogItem(props) {
  const [updatePostFn] = useMutation(updatePost)
  const [editing, setEditing] = React.useState(false)
  const openEditing = () => setEditing(true)
  const closeEditing = () => setEditing(false)

  const postUpdatePost = async (item) => {
    try {
      const {
        content, title, id, blogID,
      } = item
      await updatePostFn({
        variables: {
          blogID, content, id, title,
        },
      })

      closeEditing()
    } catch (e) {
      ToastsStore.error(e.message, 4000)
    }
  }

  const {
    id, title, content, onDelete, onEdit, createdAt,
  } = props

  const blogFormProps = {
    ...props,
    onPost: postUpdatePost,
    onClose: closeEditing,
  }

  return (
    editing
      ? <BlogForm {...blogFormProps} />
      : (
        <div id={id}>
          <PostTitle>{title}</PostTitle>
          <Preview mdInput={content} />
          <PostDate>
            {`- Posted: ${parseDate(createdAt)}`}
            {
            onDelete
              ? <GroBtn onClick={onDelete}><DeleteIcon /></GroBtn>
              : null
            }
            {
            onEdit
              ? <GroBtn onClick={openEditing}><EditIcon /></GroBtn>
              : null
            }
          </PostDate>
        </div>
      )
  )
}
