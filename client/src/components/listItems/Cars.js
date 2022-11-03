import { useState } from 'react'
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";
import { EditOutlined } from "@ant-design/icons";

const Cars = (props) => {
const { id, year, make, model, price, personId } = props;

  
    const [editMode, setEditMode] = useState(false);

    const handleEditButton = () => {
        setEditMode(!editMode);
    }

    const formatPrice = (price) => {
        return price.toLocaleString("en-US", {
          style: "currency",
          currency: "CAD",
        });
      };

    return (
        <div>
            {editMode ? (
                <UpdateCar
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    onButtonClick={handleEditButton}

                />
            ) : (
                <Card
                    type="inner"

                    actions={[
                        <EditOutlined key="edit" onClick={handleEditButton} />,
                        <RemoveCar id={id} />,
                    ]}
                >
                       <Card.Grid >Year: {year}</Card.Grid>
                        <Card.Grid >Make: {make}</Card.Grid>
                        <Card.Grid >Model: {model}</Card.Grid>
                        <Card.Grid>Price: {formatPrice(price)}</Card.Grid>
                        <Card.Grid>Person ID: {personId}</Card.Grid>
                </Card>
            )}
        </div>
    );
};


export default Cars