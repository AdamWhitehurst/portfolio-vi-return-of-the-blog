/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
`;
export const listPosts = /* GraphQL */ `
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
`;
