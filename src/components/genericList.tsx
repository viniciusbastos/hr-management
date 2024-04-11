import { Link } from "react-router-dom";

export default function GenericList(props: { path: string; name: string }) {
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-11/12">
          <Link to={props.path}>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {props.name}{" "}
            </p>
          </Link>
        </div>
        <div className="basis-1/12 mb-3">
          <Link to={props.path}></Link>
        </div>
      </div>
    </>
  );
}
