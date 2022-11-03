import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { REMOVE_CAR, PERSON_CAR } from "../../queries2";

const RemoveCar = ({ id, personId }) => {
  const [deleteCar] = useMutation(REMOVE_CAR, {
    refetchQueries: [{ query: PERSON_CAR, variables: { personId: personId } }],
  });

  const handleDeleteBtn = () => {
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
      onClick={handleDeleteBtn}
      style={{
        color: "gray",
        fontSize: "20px",
      }}
    />
  );
};

export default RemoveCar;
