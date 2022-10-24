import { HomeOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { PEOPLE_WITH_CARS } from "../../queries";
import Header from "../layout/Header";

const Details = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(PEOPLE_WITH_CARS, {
    variables: { id: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);

  return (
    <>
      <Header header="Details" />

      <Link to="/">
        <Button
          type="primary"
          icon={<HomeOutlined />}
          style={{
            display: "inline-block",
            borderRadius: "5px",
            border: "1px solid #5603AD",
            padding: "10px 15px",
            backgroundColor: "#5603AD",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            margin: "20px 0 0 0",
          }}
        >
          Go Back Home
        </Button>
      </Link>
      <h1>{id}</h1>
    </>
  );
};

export default Details;
