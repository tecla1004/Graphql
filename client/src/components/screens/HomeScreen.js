import { useQuery } from "@apollo/client";
import { GET_PERSON } from "../../queries";
import AddCar from "../form/AddCar";
import AddPerson from "../form/AddPerson";
import PeopleList from "../lists/PeopleList";
import "./Page.css";
import Title from "../layout/Title";

const HomeScreen = () => {
  const { data } = useQuery(GET_PERSON);
  return (
    <div>
    <Title title={"**PEOPLE AND THEIR CAR**"} />
      <Title title={"ADD PERSON"} />
        <AddPerson />
        <Title title={"ADD CAR"} />
        {data && data.people.length > 0 && <AddCar />}
        {data && data.people.length > 0 && <PeopleList />}
    </div>
  );
};

export default HomeScreen;
