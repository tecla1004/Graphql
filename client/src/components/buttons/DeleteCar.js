import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DELETE_CAR, PERSON_CARS } from "../../queries";

const DeleteCar = ({ id, personId }) => {
  const [deleteCar] = useMutation(DELETE_CAR, {
    refetchQueries: [{ query: PERSON_CARS, variables: { personId: personId } }],
  });

  const handleDelete = () => {
    let result = window.confirm("Are you sure you want to delete this car?");
    if (result) {
      deleteCar({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleDelete}
      style={{
        color: "gray",
        fontSize: "20px",
      }}
    />
  );
};

export default DeleteCar;
