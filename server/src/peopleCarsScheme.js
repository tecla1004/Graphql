import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]


const typeDefs = gql`
  type Person {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    year: Int
    make: String
    model: String
    price: Float
    personId: String!
  }

  type PeopleAndCart{
    id: String!
    firstName: String
    lastName: String
    cars: [Car]
  }

  type Query {
    person(id: String!): Person
    people: [Person]
    cars: [Car]
    carsByPersonId(personId: String!): [Car]
    car(id: String!): Car
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
    addCar(id: String, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    updateCar(id: String, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    removeCar(id: String!): Car
  
  }
`

const resolvers = {
  Query: {
    people: () => people,
    person: (root, args, context, info) => {
      return find(people_data, { id: args.id })
    },
    cars: () => cars,
    car: (root, args, context, info) => {
      return find(cars, { id: args.id })
    },
    carsByPersonId:(parent, args, context, info) => {
      return filter(cars, { personId: args.personId });
    }
  },
  Mutation: {
    addPerson: (parent, args, context, info) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }

      people.push(newPerson)

      return newPerson
    },
    updatePerson: (parent, args, context, info) => {
      const person = find(people, { id: args.id })

      if (!person) {
        throw new Error(`Couldn't find person`)
      }

      person.firstName = args.firstName
      person.lastName = args.lastName

      return person
    },
    removePerson: (parent, args, context, info) => {
      const person = find(people, { id: args.id })

      if (!person) {
        throw new Error(`Couldn't find person`)
      }

      remove(people, (person)=>person.id ===args.id)

      return person
    },
    addCar(parent, args, context, info) {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars.push(newCar);
      return newCar;
    },
    updateCar(parent, args, context, info) {
      const car = find(cars_data, { id: args.id });
      if (!car) {
        throw new Error("Couldn't find a car");
      }
      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.personId = args.personId;
      return car;
    },
    removeCar(parent, args, context, info) {
      const car = find(cars_data, { id: args.id });
      if (!car) {
        throw new Error("Couldn't find a car");
      }
      remove(cars, (car) => car.id === args.id);
      return car;
    },
  }
}

export { typeDefs, resolvers }
