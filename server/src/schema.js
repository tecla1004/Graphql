import { gql } from "apollo-server-express";
import { find, remove } from "lodash";
import { cars_data, people_data } from "./data";

const typeDefs = gql`
  type People {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Cars {
    id: String!
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
  }

  type Query {
    people: [People]
    person(id: String!): People
    cars: [Cars]
    car(id: String!): Cars
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): People
    updatePerson(id: String!, firstName: String!, lastName: String!): People
    deletePerson(id: String!): People

    addCar(
      id: String!
      year: String!
      make: String!
      model: String!
      price: String!
      personId: String!
    ): Cars
    updateCar(
      id: String!
      year: String!
      make: String!
      model: String!
      price: String!
      personId: String!
    ): Cars
    deleteCar(id: String!): Cars
  }
`;

const resolvers = {
  Query: {
    people: () => people_data,
    person(parent, args, context, info) {
      return find(people_data, { id: args.id });
    },

    cars: () => cars_data,
    car(parent, args, context, info) {
      return find(cars_data, { id: args.id });
    },
  },
  Mutation: {
    addPerson(root, args) {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      people_data.push(newPerson);
      return newPerson;
    },
    updatePerson(root, args) {
      const person = find(people_data, { id: args.id });

      if (!person) {
        throw new Error("Couldn't find person with id " + args.id);
      }
      person.firstName = args.firstName;
      person.lastName = args.lastName;

      return person;
    },
    deletePerson(root, args) {
      const deletedPerson = find(people_data, { id: args.id });

      if (!deletedPerson) {
        throw new Error("Couldn't find person with id " + args.id);
      }

      remove(people_data, (person) => {
        return person.id === deletedPerson.id;
      });

      return deletedPerson;
    },
    addCar(root, args) {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars_data.push(newCar);
      return newCar;
    },
    updateCar(root, args) {
      const car = find(cars_data, { id: args.id });

      if (!car) {
        throw new Error("Couldn't find car with id " + args.id);
      }
      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.personId = args.personId;

      return car;
    },
    deleteCar(root, args) {
      const deletedCar = find(cars_data, { id: args.id });

      if (!deletedCar) {
        throw new Error("Couldn't find car with id " + args.id);
      }

      remove(cars_data, (car) => {
        return car.id === deletedCar.id;
      });

      return deletedCar;
    },
  },
};

export { typeDefs, resolvers };
