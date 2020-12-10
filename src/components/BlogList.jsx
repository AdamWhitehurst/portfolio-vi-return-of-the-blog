import {
  gql, useMutation, useQuery, useSubscription,
} from '@apollo/client'
import { useAuth } from '@hooks'
import React from 'react'
import { ToastsStore } from 'react-toasts'
import styled from 'styled-components'
import { BlogItem } from './BlogItem'

const chronological = (a, b) => Number(b.blogID) - Number(a.blogID)

const PostCntnr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 1280px;
`

const postCreatedSubscription = gql`
subscription OnCreatePost {
    onCreatePost{
      id
      title
      content
      blogID
      createdAt
      updatedAt
      blog {
        id
        name
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
      }
      owner
    }
  }
`

const postUpdatedSubscription = gql`
subscription PostSubscription {
  onUpdatePost {
    id
    title
    content
    blogID
    createdAt
    updatedAt
    owner
  }
}
`

const deleteSubscription = gql`
  subscription OnDeletePost {
      onDeletePost {
        id
      }
  }
`

const listPosts = gql`
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        blogID
        createdAt
        updatedAt
        idTitle
        blog {
          id
          name
          createdAt
          updatedAt
          owner
        }
        owner
      }
      nextToken
    }
  }
`

const deletePost = gql`
  mutation MyMutation($id: ID! ) {
      deletePost(input: {id: $id}) {
        id
      }
  }
`

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

export function BlogList() {
  const {
    data,
    subscribeToMore,
    refetch,
  } = useQuery(listPosts)
  const [
    deletePostFn,
  ] = useMutation(deletePost)
  const {
    data: deletedData,

  } = useSubscription(deleteSubscription)

  useSubscription(postUpdatedSubscription)

  const [updatePostFn] = useMutation(updatePost)

  const isAuth = useAuth()

  React.useEffect(() => {
    // Why I'm doing this:
    // Because I know that `refetch` won't change, and what I really want is
    // to resync any time deletedData changes i.e. an item was deleted.
    // This circumvents having to keep some state of deleted posts and filter
    // those from posts.
    refetch()
    // eslint-disable-next-line
  }, [deletedData])

  React.useEffect(() => {
    const unsCreate = subscribeToMore({
      document: postCreatedSubscription,
      updateQuery: (prev, { subscriptionData: { data: { onCreatePost } } }) => {
        const newData = {
          ...prev,
          listPosts: {
            ...prev.listPosts,
            items: [
              ...prev.listPosts.items,
              onCreatePost,
            ],
          },
        }
        return newData
      },
      onError: () => {},
    })

    return () => { unsCreate() }
  })

  const deleteItem = (itm) => async () => {
    try {
      await deletePostFn({ variables: { id: itm.id, title: itm.title } })
      refetch()
    } catch (e) {
      ToastsStore.error(e)
    }
  }

  const editItem = async (item) => {
    try {
      const {
        content, title, id, blogID,
      } = item
      await updatePostFn({
        variables: {
          blogID, content, id, title,
        },
      })
    } catch (e) {
      ToastsStore.error(e.message, 4000)
    }
  }

  const toBlogItem = (itm) => (
    <BlogItem
      key={itm.id + itm.createdAt + itm.updatedAt}
      onDelete={isAuth ? deleteItem(itm) : undefined}
      onEdit={isAuth ? editItem : undefined}
      {...itm}
    />
  )

  return (
    <PostCntnr>
      {
        data?.listPosts?.items?.map((i) => i).sort(chronological).map(toBlogItem)
      }
    </PostCntnr>
  )
}
