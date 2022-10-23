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

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation DeletePerson($id: String!) {
    deletePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_CAR = gql`
  mutation Mutation(
    $id: String!
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
    $personId: String!
  ) {
    addCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const GET_CARS = gql`
  {
    cars {
      id
      year
      make
      model
      price
      personId
    }
  }
`;
