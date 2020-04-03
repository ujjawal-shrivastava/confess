import {gql} from 'apollo-boost';

export const getPageQuery = gql`
query Page($id: String!) {
  page(pageId: $id) {
      pageId
      name
      totalConfessions
      isPublic
  }
}`;

export const getAllConfessionsQuery = gql`
query Confessions($pageId: String!) {
  confessions(pageId: $pageId) {
      confId
  }
}`;

export const getOneConfessionQuery = gql`
query Confessions($pageId: String!, $confId: String!) {
  confessions(pageId: $pageId, confId: $confId) {
      confId
      title
      content
      likes
      dateAddedText
      ownerLiked
  }
}`;

export const getConfessionLikeQuery = gql`
query Confessions($pageId: String!, $confId: String!) {
  confessions(pageId: $pageId, confId: $confId) {
      likes
  }
}`;

export const addConfessionMutation = gql`
mutation createConfession($title: String!, $content: String!, $pageId: String!) {
  createConfession(input: {
    title: $title, content: $content, pageId:$pageId
  }) {
   confession{
    confId
    title
    dateAdded
  }
  }
}
`

export const likeConfessionMutation = gql`
mutation likeConfession($confId: String!, $value: Int!) {
  likeConfession(confId:$confId, value:$value) {
    newLikes
  }
}
`

export const createPageMutation = gql`
mutation createPage($name: String!, $isPublic: Boolean!) {
  createPage(input: {
    name: $name, isPublic:$isPublic
  }) {
    page {
      pageId
      name
      isPublic
      totalConfessions
      pin
    }
  }
}
`

export const LoginQuery = gql`
query Login($pageId: String!, $pin: String, $auth: String) {
  login(pageId: $pageId, loginPin:$pin, auth:$auth) {
    result
  }
}`;


export const getAdminPageQuery = gql`
query AdminPage($pageId: String!, $auth: String!) {
  adminPage(pageId: $pageId, auth: $auth) {
      pageId
      name
      totalConfessions
      isPublic
  }
}`;

export const getAllAdminConfessionsQuery = gql`
query AdminConfessions($pageId: String!, $auth: String!) {
  adminConfessions(pageId: $pageId, auth: $auth) {
      confId
  }
}`;

export const getOneAdminConfessionQuery = gql`
query AdminConfessions($pageId: String!, $confId: String!, $auth:String!) {
  adminConfessions(pageId: $pageId, confId: $confId, auth:$auth) {
      confId
      title
      content
      likes
      dateAddedText
      ownerLiked
  }
}`;

export const deletePageMutation=gql`
mutation deletePage($pageId: String!, $auth:String!) {
  deletePage(pageId:$pageId, auth:$auth) {
    deleted
  }
}
`

export const deleteConfessionMutation=gql`
mutation deleteConfession($pageId: String!, $auth:String!, $confId: String!) {
  deleteConfession(pageId:$pageId, auth:$auth, confId:$confId) {
    deleted
  }
}
`

export const adminLikeMutation=gql`
mutation adminLikeConfession($pageId: String!, $auth:String!, $confId: String!){
  adminLikeConfession(pageId:$pageId, auth:$auth, confId:$confId){
    liked
  }
}
`

export const adminPublicMutation=gql`
mutation adminPublicPage($pageId: String!, $auth:String!){
  adminPublicPage(pageId:$pageId, auth:$auth){
    isPublic
  }
}
`

export const getAdminConfessionLikeQuery = gql`
query AdminConfessions($pageId: String!, $confId: String!, $auth:String!) {
  adminConfessions(pageId: $pageId, confId: $confId, auth:$auth) {
      likes
      ownerLiked
  }
}`;