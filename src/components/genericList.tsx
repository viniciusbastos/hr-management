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
          <Link to={props.path}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width={20}
              height={20}
              aria-hidden="true"
              className="nz sb uo axp"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
