/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      posts {
        items {
          id
          title
          content
          blogID
          idTitle
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      posts {
        items {
          id
          title
          content
          blogID
          idTitle
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      posts {
        items {
          id
          title
          content
          blogID
          idTitle
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      content
      blogID
      idTitle
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
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      content
      blogID
      idTitle
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
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      content
      blogID
      idTitle
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
`;
