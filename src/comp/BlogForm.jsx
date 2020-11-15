import { gql, useMutation } from '@apollo/client'
import {
  usePersistentState,
} from 'hook'
import { DateTime } from 'luxon'
import React from 'react'
import { ToastsStore } from 'react-toasts'
import styled from 'styled-components'
import {
  Btn,
  InputField,
  MdEditor,
} from './Inputs'
import {
  ColBx, RowBx,
} from './Layouts'
import { Preview } from './Preview'

const Cntnr = styled(ColBx)`
    min-height: 10rem;

    & .inputField {
      font-size: 1.4rem;
    }
`

const createPost = gql`
mutation MyMutation($blogID: ID!, $content: String!, $id: ID!, $title: String!) {
  createPost(input: {blogID: $blogID, title: $title, id: $id, content: $content}) {
    id
    owner
    title
    updatedAt
    createdAt
    content
    blogID
  }
}`

export function BlogForm(props) {
  const {
    id,
    title: t,
    content: c,
    onPost,
  } = props
  const [createPostFn, result] = useMutation(createPost)
  const [title, setEditedTitle] = usePersistentState(`newPostTitle${id ? `-${id}` : ''}`, t)
  const [content, setEditedContent] = usePersistentState(`newPostContent${id ? `-${id}` : ''}`, c)
  const [showPreview, setShowPreview] = React.useState(false)

  const togglePreview = () => setShowPreview((state) => !state)

  const postNewPost = async () => {
    try {
      const idStr = DateTime.local().toFormat('yLLddHHmmss')
      await createPostFn({
        variables: {
          blogID: idStr, content, id: idStr, title,
        },
      })

      setEditedTitle('')
      setEditedContent('')
    } catch (e) {
      ToastsStore.error(e.message, 4000)
    }
  }

  const doPost = () => {
    const newPost = {
      ...props,
      content,
      title,
    }

    if (onPost) onPost(newPost)
    else postNewPost(newPost)
  }

  const validInputs = !!(title && content)
  const disableAllInputs = result.loading

  const btnProps = {
    disabled: !validInputs || disableAllInputs,
    onClick: doPost,
  }

  const titleFieldProps = {
    placeholder: 'Required',
    disabled: disableAllInputs,
    value: title,
    onChange: (e) => setEditedTitle(e.target.value),
    className: 'TEST',
  }

  const contentEditorProps = {
    value: content,
    disabled: disableAllInputs,
    onChange: (e) => setEditedContent(e.target.value),
  }

  const previewProps = {
    mdInput: content,
  }

  const toggleProps = {
    onClick: togglePreview,
  }

  const previewLabel = showPreview ? 'Edit' : 'Preview'

  return (
    <Cntnr>
      <ColBx>
        <InputField {...titleFieldProps} />
      </ColBx>
      {
        showPreview
          ? <Preview {...previewProps} />
          : <MdEditor {...contentEditorProps} />
      }
      <RowBx reverse>
        <Btn {...btnProps}>Post</Btn>
        <Btn {...toggleProps}>{previewLabel}</Btn>
      </RowBx>
    </Cntnr>

  )
}
