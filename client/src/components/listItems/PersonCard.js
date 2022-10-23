import { EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeletePerson from "../buttons/DeletePerson";
import UpdatePerson from "../form/UpdatePerson";
import "./PersonCard.css";

const PersonCard = (props) => {
  const { id, firstName, lastName } = props;

  const [editMode, setEditMode] = useState(false);

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
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #5603AD",
            fontSize: "20px",
            padding: "10px",
          }}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
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
        </Card>
      )}
    </>
  );
};

export default PersonCard;
