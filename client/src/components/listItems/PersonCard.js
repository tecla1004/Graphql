import { EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeletePerson from "../buttons/DeletePerson";
import UpdatePerson from "../form/UpdatePerson";
import CarCard from "./CarCard";
import "./PersonCard.css";

import { useQuery } from "@apollo/client";
import { PERSON_CARS } from "../../queries";

const PersonCard = (props) => {
  const { id, firstName, lastName } = props;

  const [editMode, setEditMode] = useState(false);

  const { loading, error, data } = useQuery(PERSON_CARS, {
    variables: { personId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log("person cars", data.personCars);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={{
            display: "grid",
            gridTemplateColumns: "1fr ",
            // gridTemplateRows: "1fr 1fr",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #5603AD",
            fontSize: "20px",
            padding: "10px",
          }}
          actions={[
            <EditOutlined
              style={{ color: "#5603AD", fontSize: "30px" }}
              key="edit"
              onClick={handleButtonClick}
            />,
            <DeletePerson id={props.id} />,
          ]}
          extra={
            <Link to={`/details/${id}`}>
              <Button
                type="primary"
                style={{
                  display: "inline-block",
                  borderRadius: "5px",
                  border: "1px solid #5603AD",
                  padding: "10px",
                  backgroundColor: "#5603AD",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "120px",
                  height: "40px",
                  margin: "20px 0 0 0",
                }}
              >
                Show More
              </Button>
            </Link>
          }
        >
          {firstName} {lastName}
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
        </Card>
      )}
    </>
  );
};

export default PersonCard;
