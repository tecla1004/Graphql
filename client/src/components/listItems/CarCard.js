import { Card } from "antd";

const gridStyle: React.CSSProperties = {
  width: "50%",
  textAlign: "center",
};

const CarCard = (props) => {
  const { id, year, make, model, price, personId } = props;
  const title = `${make} ${model} Details`;
  return (
    <>
      <Card type="inner" title={title} style={{ width: "100%" }}>
        <Card.Grid style={gridStyle}>Year: {year}</Card.Grid>
        <Card.Grid style={gridStyle}>Make: {make}</Card.Grid>
        <Card.Grid style={gridStyle}>Model: {model}</Card.Grid>
        <Card.Grid style={gridStyle}>Price: {price}</Card.Grid>
        <Card.Grid style={gridStyle}>Person ID: {personId}</Card.Grid>
      </Card>
    </>
  );
};

export default CarCard;
