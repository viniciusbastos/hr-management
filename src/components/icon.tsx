import { Link } from "react-router-dom";
import { ImHammer2, GiIsland } from "react-icons/im";

export default function Icon(props: {
  id: string;
  path: string;
  color: string;
  icon: string;
  children: string;
}) {
  return (
    <div className={`rounded-full p-4  bg-stone-400 mr-8 shadow-xl`}>
      <Link to={`/${props.path}/${props.id}`}>
        <ImHammer2 />
      </Link>
    </div>
  );
}
