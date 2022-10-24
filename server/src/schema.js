import { gql } from "apollo-server-express";
import { filter, find, remove } from "lodash";
import { cars_data, people_data } from "./data";

const typeDefs = gql`
  type People {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Cars {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String!
  }

  type Query {
    people: [People]
    findPersonById(id: String!): People
    cars: [Cars]
    findCarById(id: String!): Cars
    personCars(personId: String!): [Cars]
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): People
    updatePerson(id: String!, firstName: String!, lastName: String!): People
    deletePerson(id: String!): People

    addCar(
      id: String!
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: String!
    ): Cars
    updateCar(
      id: String!
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: String!
    ): Cars
    deleteCar(id: String!): Cars
    deleteCars(personId: String!): [Cars]
  }
`;

const resolvers = {
  Query: {
    people: () => people_data,
    findPersonById(parent, args, context, info) {
      return find(people_data, { id: args.id });
    },

    cars: () => cars_data,
    findCarById(parent, args, context, info) {
      return find(cars_data, { id: args.id });
    },
    personCars(parent, args, context, info) {
      return filter(cars_data, { personId: args.personId });
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
    deleteCars(root, args) {
      const deletedCars = filter(cars_data, { personId: args.personId });

      if (!deletedCars) {
        throw new Error("Couldn't find cars with personId " + args.personId);
      }

      remove(cars_data, (car) => {
        return car.personId === args.personId;
      });

      return deletedCars;
    },
  },
};

export { typeDefs, resolvers };
