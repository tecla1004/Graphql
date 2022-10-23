import AddPerson from "../form/AddPerson";
import Header from "../layout/Header";
import "./Home.css";

const Home = () => {
  return (
    <div className="App">
      <Header />
      <div className="Page">
        <AddPerson />
      </div>
    </div>
  );
};

export default Home;
