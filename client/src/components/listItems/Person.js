import { EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useState } from "react";
import DeletePerson from "../buttons/DeletePerson";
import UpdatePerson from "../form/UpdatePerson";
import Car from "./Car";

import { useQuery } from "@apollo/client";
import { PERSON_CAR } from "../../queries";


const getStyles = () => ({
  card: {
    // width: 400,
    justifyContent: "center",
  },
});

const Person = (props) => {
  const { id, firstName, lastName } = props;  
  const styles = getStyles();
  

  const [editMode, setEditMode] = useState(false);

  const { loading, error, data } = useQuery(PERSON_CAR, {
    variables: { personId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log("person cars", data.carsByPersonId);

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
        style={styles.card}
          actions={[
            <EditOutlined
              style={{ color: "green", fontSize: "30px" }}
              key="edit"
              onClick={handleButtonClick}
            />,
            <DeletePerson id={props.id} />,
          ]}
         
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
            {data.carsByPersonId.map((car) => (
              <Car
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

export default Person;
