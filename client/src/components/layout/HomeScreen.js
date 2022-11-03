import React from "react";
import Title from "../layout/Title";
import AddPerson from "../forms/AddPerson";
import People from "../lists/People";
import { useQuery } from "@apollo/client";
import { GET_PERSON } from "../../queries2";
import AddCar from "../forms/AddCar";
// import Cars from "../lists/Cars";
const HomeScreen = () => {
  const { data } = useQuery(GET_PERSON);

  return (
    <div>
      <Title title={"**PEOPLE AND THEIR CAR**"} />
      <Title title={"ADD PERSON"} />
      <AddPerson />
      <Title title={"ADD CAR"} />
      {data && data.people.length > 0 && <AddCar />}
      {data && data.people.length > 0 && <People />}
    </div>
  );
};

export default HomeScreen;
