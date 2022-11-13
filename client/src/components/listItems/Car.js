import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";

import DeleteCar from "../buttons/DeleteCar";
import UpdateCar from "../form/UpdateCar";


const Car = (props) => {
  const { id, year, make, model, price, personId } = props;
  const title = `${make} ${model} Details`;

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "CAD",
    });
  };

  return (
    <>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          type="inner"
          title={title}
          style={{
            width: "100%",
          }}
          actions={[
            <EditOutlined
              style={{
                fontSize: "20px",
                color: "blue",
                flexDirection:'row',
                listStyle:'none'
              }}
              key="edit"
              onClick={handleButtonClick}
            />,
            <DeleteCar id={props.id} personId={props.personId} />,
          ]}
        >
          <Card.Grid>Year: {year}</Card.Grid>
          <Card.Grid >Make: {make}</Card.Grid>
          <Card.Grid >Model: {model}</Card.Grid>
          <Card.Grid>Price: {formatPrice(price)}</Card.Grid>
          <Card.Grid >Person ID: {personId}</Card.Grid>
        </Card>
      )}
    </>
  );
};

export default Car;


