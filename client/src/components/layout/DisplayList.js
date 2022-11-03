import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PERSON_CAR } from "../../queries2";
import { Card } from "antd";
import Cars from "../listItems/Cars"; 


const DisplayList= (props) => {
  const { id } = useParams();
  

  const { loading, error, data } = useQuery(PERSON_CAR, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data);

    
      return (
        
        <div>
        <Card>
          <Card.Grid
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#BEA8E1",
            }}
          >
            <div className="profile-info">
              <h2
                style={{
                  color: "#5603AD",
                  fontSize: "3rem",
                }}
              >
                {data.person.firstName} {data.person.lastName}
              </h2>
            </div>
          </Card.Grid>
        </Card>
        <Card
        type="inner"
        style={{
          border: "none",
          gridColumn: "1 / 3",
          gridRow: "2 / 3",
        }}
      >
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
          
       </div>
      );
    }
    


export default DisplayList;