import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Card className="mt-8">
      <h1 className="text-6xl text-center">Oops! You seem to be lost.</h1>
      <h1 className="text-3xl text-center">404 Not Found!</h1>
      <h2 className="text-xl text-rigth">Here are some helpful links:</h2>
      <Link to="/">Home</Link>
      <Link to="/Home">Blog</Link>
      <Link to="/dashboard">Contact</Link>
    </Card>
  );
}
