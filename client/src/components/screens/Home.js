import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import AddCar from "../form/AddCar";
import AddPerson from "../form/AddPerson";
import Header from "../layout/Header";
import PeopleList from "../lists/PeopleList";
import "./Home.css";

const Home = () => {
  const { data } = useQuery(GET_PEOPLE);
  return (
    <div className="App">
      <Header header="People & Cars" />
      <div className="Page">
        <AddPerson />
        {data && data.people.length > 0 && <AddCar />}
        {data && data.people.length > 0 && <PeopleList />}
      </div>
    </div>
  );
};

export default Home;
