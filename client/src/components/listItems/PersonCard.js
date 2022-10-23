import { Card } from "antd";
import DeletePerson from "../buttons/DeletePerson";

const PersonCard = (props) => {
  const { firstName, lastName } = props;
  return (
    <>
      <Card actions={[<DeletePerson id={props.id} />]}>
        {firstName} {lastName}
      </Card>
    </>
  );
};

export default PersonCard;
