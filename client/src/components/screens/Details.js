import { HomeOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Avatar, Button, Card } from "antd";
import { Link, useParams } from "react-router-dom";
import { PEOPLE_WITH_CARS } from "../../queries";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import CarCard from "../listItems/CarCard";
import "./Page.css";

const Details = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(PEOPLE_WITH_CARS, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  // console.log(data);

  return (
    <div className="App">
      <Header header="Details" />

      <div className="profile">
        <Card
          title="Profile"
          style={{
            maxWidth: "1000px",
            width: "70vw",
            borderRadius: "5px",
            border: "1px solid #5603AD",
            padding: "10px 15px",
            margin: "20px auto",
            color: "white",
            alignItems: "center",
          }}
        >
          <Card.Grid
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar size={200} src="https://joeschmoe.io/api/v1/random" />
          </Card.Grid>
          <Card.Grid
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#BEA8E1",
            }}
          >
            <div className="profile-info">
              <h2
                style={{
                  color: "#5603AD",
                  fontSize: "3rem",
                }}
              >
                {data.findPersonById.firstName} {data.findPersonById.lastName}
              </h2>
            </div>
          </Card.Grid>
        </Card>
      </div>
      <Card
        type="inner"
        style={{
          border: "none",
          gridColumn: "1 / 3",
          gridRow: "2 / 3",
        }}
      >
        {data.personCars.map((car) => (
          <CarCard
            key={car.id}
            id={car.id}
            make={car.make}
            model={car.model}
            year={car.year}
            price={car.price}
            personId={car.personId}
          />
        ))}
      </Card>

      <Link to="/">
        <Button
          type="primary"
          icon={<HomeOutlined />}
          style={{
            display: "inline-block",
            borderRadius: "5px",
            border: "1px solid #5603AD",
            padding: "10px 15px",
            backgroundColor: "#5603AD",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            margin: "20px 0 0 0",
          }}
        >
          Go Back Home
        </Button>
      </Link>
      <Footer />
    </div>
  );
};

export default Details;
