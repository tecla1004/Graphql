import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_PERSON } from "../../queries";
import Person from "../listItems/Person";


const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const PeopleList = () => {
  const { loading, error, data } = useQuery(GET_PERSON, {
  });

  const styles = getStyles()

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  console.log("people data", data.people);
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Person id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  )
};

export default PeopleList;
