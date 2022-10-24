import car from "../../assets/car.svg";
import "./Header.css";

const Header = (props) => {
  const { header } = props;
  return (
    <div className="header">
      {/* Image by storyset on Freepik */}
      <img src={car} alt="car" />
      <h1>{header}</h1>
    </div>
  );
};

export default Header;
