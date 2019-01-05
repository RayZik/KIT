import gql from 'graphql-tag';



export const LoginMutation = {
  auth_local: gql`
  mutation auth_local($email: String!, $password: String!) {
    auth_local(email: $email, password: $password) {
      auth {
        token
        refreshToken
      }
      user {
        id
        email
        name
        avatar
      }
    }
  }
`};
