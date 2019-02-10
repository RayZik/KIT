import gql from 'graphql-tag';



export const LoginMutation = {
  auth_local: gql`
  mutation auth_local($email: String!, $password: String!) {
    access {
      auth_local(email: $email, password: $password) {
      auth {
        token
        refresh_token
      }
      user {
        id
        email
        name
        avatar_url
      }
    }
    }
  }
`};
