import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query GetUsers {
    users {
      id
      name
      username
    }
  }
`;

export const QUERY_ALL_MOVIES = gql`
  query GetMovies {
    movies {
      id
      name
      isInTheaters
    }
  }
`;

export const QUERY_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;
