import car from "../../assets/car.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      {/* Image by storyset on Freepik */}
      <img src={car} alt="car" />
      <h1>People & Cars</h1>
    </div>
  );
};

export default Header;
