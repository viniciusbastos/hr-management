import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const CardDashboard = (props: {
  title: string;
  quant: number;
  info: string;
  link: string;
}) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(props.link);
  }
  return (
    <div
      className="p-10 bg-white rounded-2xl shadow-xl border-spacing-1"
      onClick={handleClick}
    >
      <div className="shrink-0">
        <div className="text-2xl font-medium text-gray-800 font-sans">
          {props.title}
        </div>
        <h2 className="text-lg text-gray-600  font-sans">{props.quant}</h2>
        <p className="text-gray-400 font-sans ">{props.info}</p>
      </div>
    </div>
  );
};

export default CardDashboard;
