import React, { useState } from 'react';
import { ToastsStore } from 'react-toasts';
import { gql, useMutation } from '@apollo/client';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import {
  MdEditor,
  Btn,
  InputField,
} from './Inputs';
import {
  RowBx,
  ColBx,
} from './Layouts';
import {
  InputHighlight,
} from './Labels';

const Cntnr = styled(ColBx)`
    min-height: 10rem;

    & .inputField {
      font-size: 1.4rem;
    }
`;

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
}`;

export function BlogForm() {
  const [createPostFn, result] = useMutation(createPost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const postPost = async () => {
    try {
      const idStr = DateTime.local().toFormat('yLLddHHmmss');
      await createPostFn({
        variables: {
          blogID: idStr, content, id: idStr, title,
        },
      });

      setTitle('');
      setContent('');
    } catch (e) {
      ToastsStore.error(e.message, 4000);
    }
  };

  const validInputs = !!(title && content);
  const disableAllInputs = result.loading;

  const btnProps = {
    disabled: !validInputs || disableAllInputs,
    onClick: postPost,
  };

  const titleFieldProps = {
    placeholder: 'Required',
    disabled: disableAllInputs,
    value: title,
    onChange: (e) => setTitle(e.target.value),
    className: 'TEST',
  };

  const contentEditorProps = {
    value: content,
    disabled: disableAllInputs,
    onChange: (e) => setContent(e.target.value),
  };

  return (
    <Cntnr>
      <ColBx>
        <InputField {...titleFieldProps} />
        <InputHighlight />
      </ColBx>
      <MdEditor {...contentEditorProps} />
      <RowBx>
        <Btn {...btnProps}>Create Post</Btn>
      </RowBx>
    </Cntnr>

  );
}
