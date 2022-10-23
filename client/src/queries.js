import { gql } from "@apollo/client";

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`;

export const GET_PERSON = gql`
  query GetPerson($id: String!) {
    person(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        make
        model
        year
      }
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $id: String!
    $make: String!
    $model: String!
    $price: Float!
    $year: Int!
    $personId: String!
  ) {
    addCar(
      id: $id
      make: $make
      model: $model
      year: $year
      price: $price
      personId: $personId
    ) {
      id
      make
      model
      year
      personId
    }
  }
`;

export const GET_CARS = gql`
  {
    cars {
      id
      make
      model
      year
      personId
    }
  }
`;

export const GET_CAR = gql`
  query GetCar($id: String!) {
    car(id: $id) {
      id
      make
      model
      year
      personId
    }
  }
`;
