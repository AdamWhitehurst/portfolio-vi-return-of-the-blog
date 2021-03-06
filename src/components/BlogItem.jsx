import { DateTime } from 'luxon'
import React from 'react'
import { BlogForm } from './BlogForm'
import { Btn } from './Inputs'
import { PostDate, PostTitle } from './Labels'
import { Preview } from './Preview'

const DeleteIcon = () => (<span role="img" aria-label="delete">❌</span>)
const EditIcon = () => (<span role="img" aria-label="edit">🖊</span>)

const parseDate = (dt) => DateTime.fromISO(dt).toLocaleString(DateTime.DATETIME_FULL)

export function BlogItem(props) {
  const [editing, setEditing] = React.useState(false)
  const openEditing = () => setEditing(true)
  const closeEditing = () => setEditing(false)

  const {
    id, title, content, onDelete, onEdit, createdAt,
  } = props

  const blogFormProps = {
    ...props,
    onPost: onEdit,
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
              ? <Btn onClick={onDelete}><DeleteIcon /></Btn>
              : null
            }
            {
            onEdit
              ? <Btn onClick={openEditing}><EditIcon /></Btn>
              : null
            }
          </PostDate>
        </div>
      )
  )
}
