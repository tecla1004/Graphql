import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";

import {
  DELETE_CARS_BY_PERSON,
  REMOVE_PERSON,
  GET_CARS,
  GET_PERSON,
} from "../../queries";

import filter from "lodash/filter";

const DeletePerson = ({ id }) => {
  const [deletePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { deletePerson } }) {
      const { people } = cache.readQuery({ query: GET_PERSON });
      cache.writeQuery({
        query: GET_PERSON,
        data: {
          people: filter(people, (person) => person.id !== id),
        },
      });
    },
  });

  const [deleteCars] = useMutation(DELETE_CARS_BY_PERSON, {
    update(cache, { data: { deleteCars } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (car) => car.personId !== id),
        },
      });
    },
  });

  const handleDelete = () => {
    let result = window.confirm(
      "Are you sure you want to delete this person and all their cars?"
    );
    if (result) {
      deletePerson({
        variables: {
          id,
        },
      });
      deleteCars({
        variables: {
          personId: id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleDelete}
      style={{ color: "red", fontSize: "30px" }}
    />
  );
};

export default DeletePerson;
