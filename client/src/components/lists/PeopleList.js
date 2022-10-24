import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_PEOPLE } from "../../queries";
import PersonCard from "../listItems/PersonCard";

const PeopleList = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  console.log("people data", data.people);
  return (
    <>
      <h2
        style={{
          gridColumn: "1 / 3",
          gridRow: "1 / 2",
          textAlign: "center",
          color: "#5603AD",
          marginBottom: "40px",
        }}
      >
        People List
      </h2>
      <List grid={{ gutter: 16, column: 4 }}>
        {data.people.map((person) => (
          <List.Item key={person.id}>
            <PersonCard
              id={person.id}
              firstName={person.firstName}
              lastName={person.lastName}
            />
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default PeopleList;
