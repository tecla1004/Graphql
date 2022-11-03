import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/UpdatePerson'
import { useQuery } from "@apollo/client";
import { PERSON_CAR } from "../../queries2";
import Cars from './Cars';


const getStyles = () => ({
  card: {
    width: 400,
    justifyContent: "center",
  },
});

const Person = props => {
  const { id, firstName, lastName } = props
  const styles = getStyles();
  
  const [editMode, setEditMode] = useState(false);


  const { loading, error, data } = useQuery(PERSON_CAR, {
    variables: { personId: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;


 

  const handleButtonClick = () => setEditMode(!editMode);


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
                style={{ color: "#5603AD", fontSize: "30px" }}
                key="edit"
                onClick={handleButtonClick}
              />,
              <RemovePerson id={id} />,
            ]}
          >
            {firstName} {lastName}
            {data.carsByPersonId.map((car) => (
              <Cars
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
        )}
      </>

    )
        }
export default Person;
